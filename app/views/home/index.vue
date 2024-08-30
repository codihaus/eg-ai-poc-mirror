<template>

	<div class="container">
		<div class="mb-4">
			<nuxt-link to="/trang/item">Static Page</nuxt-link>
			<div class="grid grid-cols-2">
				<pre> {{ $adminClient }} </pre>
				<pre> {{ $userClient }} </pre>
			</div>
		</div>

		<div class="py-5">
			<pre>{{currentUser}}</pre>
		</div>
		<div>
			<nuxt-link to="/directus">Example Form</nuxt-link>
		</div>


		<div class="flex gap-6">
			<h3 class="text-lg">Login form</h3>
			<div class="max-w-sm">
				<form action="" class="space-y-3">
					<n-input v-model:value="email" type="text" placeholder="username"/>
					<n-input v-model:value="password" type="password" placeholder="password"/>
					<n-button @click="loginHandle">
						{{ t("LOGIN", {name: "Minh"}) }} {{ nuxtApiAuth.loading }}
					</n-button>
				</form>
			</div>

		</div>

		<div>
			<div class="max-w-sm">
				<div class="flex gap-4 mt-6">
					<n-button @click="nuxtApiAuth.getMe()">
						GetME
					</n-button>


					<n-button @click="nuxtApiAuth.logout()">
						Logout {{ nuxtApiAuth.loading }}
					</n-button>
				</div>

				<div>
					ME
					<pre>
						{{ nuxtApp.$auth?.user }}
					</pre>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<h2 class="text-primary my-6 flex text-2xl font-bold">Test Lang</h2>
		<AppParagraph tag="h3" look="heading">this is home</AppParagraph>

		<!-- <pre>Current: {{ config.currentLanguage }}</pre>
		<AppButton @click="handleClick"> Set to English </AppButton> -->
	</div>

	<div class="container">
		<button @click="counter++">Increment {{ counter }}</button>
		<pre>{{ config.languages }}</pre>
	</div>

	<div class="container">
		<h2 class="text-primary my-6 text-2xl font-bold">Dev Button</h2>
	</div>

	<div class="container">
		<h2 class="text-primary my-6 text-2xl font-bold heading-1">
			Test icon
		</h2>
		<Icon
			name="ph:heart"
			size="40"
			class="hover:text-primary duration-200"
		/>
	</div>

	<div class="container">
		<h2 class="text-primary my-6 text-2xl font-bold heading-2">
			Test social link
		</h2>
		<pre>{{ socialLink }}</pre>
	</div>

	<div class="container">
		<h2 class="text-primary my-6 text-2xl font-bold">
			Dynamic captcha load
		</h2>
		<AppButton @click="getToken()"> get</AppButton>
		<pre>{{ token }}</pre>
	</div>
	<div class="container">
		<h2 class="text-primary my-6 text-2xl font-bold">
			Dynamic captcha load
		</h2>
	</div>
	<div class="container">
		<h2 class="text-primary my-6 text-2xl font-bold">Login social</h2>
		<p>Facebook: {{ socialLogin.Facebook("/custom") }}</p>
		<p>Google: {{ socialLogin.Google() }}</p>
	</div>
	<div class="mb-20"></div>
</template>

<script setup lang="ts">
import {NInput, NButton} from "naive-ui";
import {useSentry} from "~/layers/base/composables/useSentry";
import {useNADAuth} from "@directusLayer/modules/nad/composables/useNADAuth";

const {t} = useI18n();

const config = useConfigStore();
const socialLink = useLinkSocial();
const socialLogin = getLinkLoginSocial();

const {token, getToken} = useCaptcha();

const counter = ref(1);

const email = ref("contact@codihaus.com")
const password = ref("!@#CDH2020!@#")
const nuxtApiAuth = useNADAuth()

async function loginHandle() {
	await nuxtApiAuth.login(email.value, password.value)
}

const nuxtApp = useNuxtApp()
const {
	$adminClient,
	$userClient
} = useNuxtApp()

const sentry = useSentry()
onMounted(() => {

})

const currentUser = useState("currentUser", () => {
	return {}
})
</script>
