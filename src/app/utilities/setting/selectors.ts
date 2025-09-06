// Selectors
export const saveLocal = (state:any): String => state.setting.saveLocal;
export const app_name = (state:any): String => state.setting.setting.app_name.value;
export const theme_scheme = (state:any): String => state.setting.setting.theme_scheme.value;
export const theme_scheme_direction = (state:any): String => state.setting.setting.theme_scheme_direction.value;
export const theme_style_appearance = (state:any): String[] => state.setting.setting.theme_style_appearance.value;
export const theme_color = (state:any): String => state.setting.setting.theme_color;
export const theme_transition = (state:any): String => state.setting.setting.theme_transition.value;
export const theme_font_size = (state:any): String => state.setting.setting.theme_font_size.value;
export const page_layout = (state:any): String => state.setting.setting.page_layout.value;
export const header_navbar = (state:any): String => state.setting.setting.header_navbar.value;
export const card_style = (state:any): String => state.setting.setting.card_style.value;
export const header_banner = (state:any): String => state.setting.setting.header_banner.value;
export const sidebar_color = (state:any): String => state.setting.setting.sidebar_color.value;
export const sidebar_type = (state:any): String[] => state.setting.setting.sidebar_type.value;
export const sidebar_show = (state:any): String => state.setting.setting.sidebar_show.value;
export const navbar_show = (state:any): String => state.setting.setting.navbar_show.value;
export const sidebar_menu_style = (state:any): String  => state.setting.setting.sidebar_menu_style.value;
export const footer = (state:any): String => state.setting.setting.footer.value;
export const body_font_family = (state:any): String => state.setting.setting.body_font_family.value;
export const heading_font_family = (state:any): String => state.setting.setting.heading_font_family.value;

export const settingObj = (state:any): String => state.setting;
