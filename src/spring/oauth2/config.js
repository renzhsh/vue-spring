export let defaultConfig = {
    // 授权服务器地址
    AuthServerBaseAddress: '',
    // Token路径
    TokenPath: '/OAuth/Token',
    // 用户注册路径
    RegisterPath: '/api/Account/register',
    // 修改用户密码路径
    ModifyPasswordPath: '/api/Account/modify/password',
    // 修改用户信息路径
    ModifyUserInfoPath: '/api/Account/modify/info',
    // 客户端 Id
    ClientId: '',
    // 客户端密钥
    ClientSecret: '',
    //
    TOKEN_KEY: 'TOKEN'
};

class Configurate {
    // 授权服务器地址
    get AuthServerBaseAddress() {
        return defaultConfig.AuthServerBaseAddress;
    }

    // Token路径
    get TokenPath() {
        return this.AuthServerBaseAddress ? `${this.AuthServerBaseAddress}/${defaultConfig.TokenPath}` : defaultConfig.TokenPath;
    }
    // 用户注册路径
    get RegisterPath() {
        return this.AuthServerBaseAddress ? `${this.AuthServerBaseAddress}/${defaultConfig.RegisterPath}` : defaultConfig.RegisterPath;
    }
    // 修改用户密码路径
    get ModifyPasswordPath() {
        return this.AuthServerBaseAddress ? `${this.AuthServerBaseAddress}/${defaultConfig.ModifyPasswordPath}` : defaultConfig.ModifyPasswordPath;
    }
    // 修改用户信息路径
    get ModifyUserInfoPat() {
        return this.AuthServerBaseAddress ? `${this.AuthServerBaseAddress}/${defaultConfig.ModifyUserInfoPath}` : defaultConfig.ModifyUserInfoPath;
    }
    // 客户端 Id
    get ClientId() {
        return defaultConfig.ClientId;
    }
    // 客户端密钥
    get ClientSecret() {
        return defaultConfig.ClientSecret;
    }
    //
    get TOKEN_KEY() {
        return defaultConfig.TOKEN_KEY;
    }
};

export let config = new Configurate();
