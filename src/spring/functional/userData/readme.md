# UserData 用户数据

分为 localData 和 remoteData 两种：
+ localData : 本地数据。用户在使用系统的过程中留下的数据，比如登录凭证、偏好设置、通知记录等
+ remoteData : 远程数据。系统运行必备的数据，比如配置数据等

通过window.localStorage的方式缓存在本地，避免每次启动时都从远程加载。

为了保证远程数据变更后缓存能及时更新：
1. 每条数据设置有效期；
1. 在缓存页面手动更新；