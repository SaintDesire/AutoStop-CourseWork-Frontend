class DASHBOARD {
    private root = ''

    HOME = `${this.root}/`
    CARLIST = `${this.root}/carlist`
    CAR = `${this.root}/car`
    MARKETPLACE = `${this.root}/marketplace`
    ABOUT = `${this.root}/about`
    CONTACT = `${this.root}/contact`
    LOGIN = `${this.root}/login`
    SIGNUP = `${this.root}/signup`
    SIGNOUT = `${this.root}/signout`
    RESET_PASSWORD = `${this.root}/reset-password`
    PROFILE = `${this.root}/profile`
    PROFILE_ADS = `${this.PROFILE}/ads`
    SETTINGS = `${this.PROFILE}/settings`
}

export const DASHBOARD_PAGES = new DASHBOARD()