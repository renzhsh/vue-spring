# 认证授权模块
## 使用步骤

### 配置
```
import OAuth2 from 'oauth2';
OAuth2.setup({
    // 授权服务器地址
    AuthServerBaseAddress: 'http://localhost',
    // 授权路径
    AuthorizePath: '/OAuth/Authorize',
    // Token路径
    TokenPath: '/OAuth/Token',
    // 用户信息路径
    UserInfoPath: '/Api/Account',
    // 用户注册路径
    RegisterPath: '/Api/Account/register',
    // 修改用户密码路径
    ModifyPasswordPath: '/Api/Account/modify/password',
    // 修改用户信息路径
    ModifyUserInfoPath: '/Api/Account/modify/info',
    // 客户端 Id
    ClientId: '',
    // 客户端密钥
    ClientSecret: '',
});

Vue.use(OAuth2)
```

> 以上皆为默认值，可根据需要修改

+ [0.2.1] AuthServerBaseAddress

	如果认证服务器是单独部署，请设置该值；否则请设置为空(默认为'')。

### 使用

可以通过Vue或Vue实例(this)直接访问$User对象。

```
this.$User.passwordLogin('22222', '22222').then(() => {
      console.dir(this.$User.AccessToken)
}).catch(ex=>{
	alert(ex)
})
```

```
let token = Vue.$User.AccessToken
```

## $User提供的方法

 +   clientLogin()：客户端登录。以客户端的身份（clientId）登录，所以不需要用户名和密码。
 +   passwordLogin(username, password) ：密码登录。
 +   logout()：退出登录。
 +   register(username, password)：注册新用户。
 +   modifyPassword(oldPwd, newPwd)：修改密码(前提是已登录)。成功后需要重新登录。
 +   modifyUserInfo(info)：修改用户的基本信息(前提是已登录)。

 > 以上皆为异步方法，可以通过异步方式或promise的方式调用。

 > 如果方法没有执行成功，将抛出错误异常，请使用try-catch。

## $User提供的属性

 + AccessToken： 访问令牌。
 + UserInfo : 用户的基本信息。
 + Logined ：用户是否已登录。


 > 在需要授权的请求中添加配置
 ```
  config.headers["Authorization"] = "bearer " + AccessToken;
 ```

> UserInfo的详细字段：
```
{
	UserName, // 用户名，即登录名
	RealName, // 真实姓名
	Sex, // 性别 0男 1女 2未知
	Email, // 邮箱
	PhoneNumber, // 手机号码
	SecurityStamp, // 秘钥
}
```
