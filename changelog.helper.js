import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

// Để sử dụng __dirname trong module ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const markdownNewLine =
    `
`;
const EpicTitle = '🏆 Epic';

// GitLab project ID và token
const gitlabProjectId = '';
const gitlabToken = 'glpat-SKUD826ejs3eNynBMMPd';
const gitlabApiUrl = `https://git.codihaus.com/api/v4/projects/${gitlabProjectId}`;

if (!gitlabProjectId) {
    console.error('Please provide a GitLab project ID');
    process.exit(1);
}

// Đọc nội dung changelog mới nhất
const changelogPath = path.join(__dirname, 'CHANGELOG.md');
let changelog = fs.readFileSync(changelogPath, 'utf8');

const changelogRegex = /## v(\d+\.\d+\.\d+)\n\n(.*?)(?=## v\d+\.\d+\.\d+|\s*$)/gs;
const [newChangelog] = changelog.match(changelogRegex);

// Trích xuất thông tin phiên bản mới nhất
// const versionRegex = /## \[(.*?)\]/;
const versionRegex = /## v(\d+\.\d+\.\d+)/;
const match = newChangelog.match(versionRegex);
const latestVersion = match ? match[1] : null;

console.log(latestVersion)

if (!latestVersion) {
    console.error('Could not determine the latest version from CHANGELOG.md');
    process.exit(1);
}

if (newChangelog.includes(EpicTitle)) {
    console.log('Release already created for this version');
    process.exit(0);
}

// Tìm các issue IDs trong changelog
const issueRegex = /#(\d+)/g;
let issues = [...newChangelog.matchAll(issueRegex)].map(match => match[1]);

issues = [...new Set(issues)]; // Lọc các issue trùng lặp

// Cập nhật changelog và tạo release
updateChangelogWithIssueTitles().catch(e => {
    console.log(e)
})


async function fetchIssueTitle(issueId) {
    const response = await fetch(`${gitlabApiUrl}/issues/${issueId}`, {
        headers: {
            'Authorization': `Bearer ${gitlabToken}`
        }
    });
    const issue = await response.json();

    console.log(`epic ${issue.epic?.title} - issue #`, issueId)
    return {
        epic: issue.epic?.title ? `${issue.epic.title} &${issue.epic.iid}` : 'No Epic',
        title: `${issue.title} #${issue.iid}`
    }
}


// Thêm tiêu đề issue vào changelog
async function updateChangelogWithIssueTitles() {
    const issueTitles = {};

    for (let issueId of issues) {
        const issueDetail = await fetchIssueTitle(issueId)

        if (!issueTitles[issueDetail.epic]) issueTitles[issueDetail.epic] = [];

        issueTitles[issueDetail.epic].push(issueDetail.title)
    }

    // Thêm section epic và thời gian vào changelog
    let epicSection = `${markdownNewLine}### ${EpicTitle} ${markdownNewLine}`

    Object.keys(issueTitles).forEach(epic => {
        epicSection += `${markdownNewLine}- ${epic}${markdownNewLine}`

        issueTitles[epic].forEach(issue => {
            epicSection += `  - ${issue}${markdownNewLine}`
        })
    })

    const newLog = newChangelog.replace(`v${latestVersion}`, `v${latestVersion}\n ${epicSection}`)
    const updatedChangelog = changelog.replace(newChangelog, newLog);

    fs.writeFileSync(changelogPath, updatedChangelog);
}
