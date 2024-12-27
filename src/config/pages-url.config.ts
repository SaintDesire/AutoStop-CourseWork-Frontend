class DASHBOARD {
    private root = ''

    HOME = `${this.root}/`
    CARLIST = `${this.root}/catalog`
    CARLIST_CAR = `${this.CARLIST}/car`
    MARKETPLACE = `${this.root}/marketplace`
    MARKETPLACE_CAR = `${this.MARKETPLACE}/car`
    MARKETPLACE_CAR_ADD = `${this.MARKETPLACE_CAR}/add`
    ABOUT = `${this.root}/about`
    CONTACT = `${this.root}/contact`
    LOGIN = `${this.root}/login`
    SIGNUP = `${this.root}/signup`
    SIGNOUT = `${this.root}/signout`
    RESET_PASSWORD = `${this.root}/reset-password`
    PROFILE = `${this.root}/profile`
    PROFILE_DASHBOARD = `${this.PROFILE}/dashboard`
    SETTINGS = `${this.PROFILE}/settings`
}

export const DASHBOARD_PAGES = new DASHBOARD()