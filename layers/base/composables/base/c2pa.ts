import { createC2pa, generateVerifyUrl, selectProducer, createL2ManifestStore } from 'c2pa';
import wasmSrc from 'c2pa/dist/assets/wasm/toolkit_bg.wasm?url';
import workerSrc from 'c2pa/dist/c2pa.worker.js?url';
import 'c2pa';

interface Metadata {
    label: string;
    data: Record<string, any>;
}

interface ExtractedInfo {
    softwareAgent: string;
    url: string;
    owner: string;
    productBy: string;
    viewMoreUrl: string;
    appOrDeviceUsed: string;
    date: string;
}

export const useC2pa = async (idImage: string) => {
    const URL = useRuntimeConfig().public.url
    const URL_IMAGE = `${URL}/api/assets/${idImage}`
    const c2pa = await createC2pa({ wasmSrc, workerSrc });
    const { manifestStore } = await c2pa.read(URL_IMAGE)

    if (!manifestStore) return { activeManifestPropertiesV2: null }
    const { manifestStore: l2ManifestStore } = await createL2ManifestStore(manifestStore);
    const viewMoreUrl = computed(() => generateVerifyUrl(URL_IMAGE))

    const activeManifestProperties: ComputedRef<Record<string, string | undefined>> = computed(() => {
        const activeManifest = manifestStore?.activeManifest;
        return {
            title: activeManifest.title,
            format: activeManifest.format,
            claimGenerator: activeManifest.claimGenerator.split('(')[0]?.trim(),
            producer: selectProducer(activeManifest)?.name ?? 'Unknown',
            thumbnail: idImage,
            ingredients: (activeManifest.ingredients ?? []).map((i) => i.title).join(', '),
            signatureIssuer: activeManifest.signatureInfo?.issuer,
            signatureDate: activeManifest.signatureInfo?.time ? useDateFormat(activeManifest.signatureInfo.time, 'MMM DD, YYYY').value : 'No date available',
            viewMoreUrl: viewMoreUrl.value,
        };
    })

    const activeManifestPropertiesV2 = computed(() => {
        const metadata = Object.values(manifestStore?.manifests)?.[0]?.assertions?.data
        return extractInfo(metadata)
    });


    return {
        activeManifestProperties: activeManifestProperties.value,
        activeManifestPropertiesV2: activeManifestPropertiesV2.value,
        viewMoreUrl: viewMoreUrl.value,
        l2ManifestStore,
        manifestStore,
    }


    function extractInfo(metadata: Metadata[]): ExtractedInfo {
        const date = l2ManifestStore?.signature?.isoDateString ? useDateFormat(l2ManifestStore?.signature?.isoDateString, 'MMM DD, YYYY').value : 'No date available'
        const result: ExtractedInfo = {
            softwareAgent: '',
            url: '',
            owner: '',
            productBy: '',
            viewMoreUrl: viewMoreUrl.value,
            appOrDeviceUsed: l2ManifestStore?.claimGenerator?.product,
            date
        };

        const findItem = (label: string) => metadata.find(item => item.label === label)?.data;
        const c2paActions = findItem('c2pa.actions');
        if (c2paActions?.actions) {
            const createdAction = c2paActions.actions.find((action: any) => action.action === 'c2pa.created');
            if (createdAction?.softwareAgent) {
                result.softwareAgent = createdAction.softwareAgent;
                result.owner = createdAction.softwareAgent;
            }
        }

        const schemaOrg = findItem('stds.schema-org.CreativeWork');
        if (schemaOrg) {
            result.url = schemaOrg.url || '';
            if (Array.isArray(schemaOrg.author)) {
                result.productBy = schemaOrg.author.map((author: any) => author.name).join(', ');
            }
        }
        return result;
    }

}