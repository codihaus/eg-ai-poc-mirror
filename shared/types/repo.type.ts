export type globalSetting = {
  favicon: string,
  logo: string,
  fb_app_id: string,
  site_name: string,
  menu_top: string,
  menu_primary: string,
  account_url: string,
  footer_logo: string,
  footer_content: string,
  phone: string,
  email: string,
  website: string,
  facebook: string,
  instagram: string,
  youtube: string,
  tiktok: string,
  linkedin: string,
  footer_menu_1: string,
  footer_menu_2: string,
  footer_menu_3: string,
  copyright: string,
  app_link: {
    qr_code_url: string,
    qr_code_src: string,
    title: string,
    ios_url: string,
    android_url: string,
    ios_img: string,
    android_img: string,
  },
  [key: string]: any
}

export type bannerItem = {
  [key: string]: any
}