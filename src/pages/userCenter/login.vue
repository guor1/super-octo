<template>
  <div class="login_bg">
    <div class="login_adv" style="background-image: url(/img/auth_banner.jpg);">
      <div class="login_adv__title">
        <h2>SCUI</h2>
        <h4>{{ $t('login.slogan') }}</h4>
        <p>{{ $t('login.describe') }}</p>
      </div>
      <div class="login_adv__bottom">
        © {{ $CONFIG.APP_NAME }} {{ $CONFIG.APP_VER }}
      </div>
    </div>
    <div class="login_main">
      <div class="login_config">
        <el-button circle type="info" @click="configTheme">
          <ep-icon :icon="config.theme=='dark'?'ep:sunny':'ep:moon'" />
        </el-button>
        <el-dropdown trigger="click" placement="bottom-end" @command="configLang">
          <el-button circle>
            <ep-icon icon="carbon:language" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in lang" :key="item.value" :command="item" :class="{'selected':config.lang==item.value}">{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="login-form">
        <div class="login-header">
          <div class="logo">
            <img :alt="$CONFIG.APP_NAME" src="/img/logo.png">
            <label>{{ $CONFIG.APP_NAME }}</label>
          </div>
          <h2>{{ $t('login.signInTitle') }}</h2>
        </div>
        <el-form ref="loginForm" :model="ruleForm" :rules="rules" label-width="0" size="large">
          <el-form-item prop="user">
            <el-input v-model="ruleForm.user" clearable :placeholder="$t('login.userPlaceholder')">
              <template #prefix>
                <ep-icon icon="ep-user" class="el-input__icon" />
              </template>
              <template #append>
                <el-select v-model="userType" style="width: 130px;">
                  <el-option :label="$t('login.admin')" value="admin" />
                  <el-option :label="$t('login.user')" value="user" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" clearable show-password :placeholder="$t('login.PWPlaceholder')">
              <template #prefix>
                <ep-icon icon="ep-lock" class="el-input__icon" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 10px;">
            <el-row>
              <el-col :span="12">
                <el-checkbox v-model="ruleForm.autologin" :label="$t('login.rememberMe')" />
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <el-button type="text">{{ $t('login.forgetPassword') }}？</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" :loading="islogin" round @click="login">{{ $t('login.signIn') }}</el-button>
          </el-form-item>
        </el-form>

        <el-divider>{{ $t('login.signInOther') }}</el-divider>

        <div class="login-oauth">
          <el-button size="small" type="success" circle>
            <ep-icon icon="carbon:logo-wechat" />
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userType: 'admin',
      ruleForm: {
        user: 'admin',
        password: 'admin',
        autologin: false,
      },
      rules: {
        user: [
          { required: true, message: this.$t('login.userError'), trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.$t('login.PWError'), trigger: 'blur' },
        ],
      },
      islogin: false,
      config: {
        lang: this.$TOOL.data.get('APP_LANG') || this.$CONFIG.LANG,
        theme: this.$TOOL.data.get('APP_THEME') || 'default',
      },
      lang: [
        {
          name: '简体中文',
          value: 'zh-cn',
        },
        {
          name: 'English',
          value: 'en',
        },
        {
          name: '日本語',
          value: 'ja',
        },
      ],
    }
  },
  watch: {
    userType (val) {
      if (val === 'admin') {
        this.ruleForm.user = 'admin'
        this.ruleForm.password = 'admin'
      }
      else if (val === 'user') {
        this.ruleForm.user = 'user'
        this.ruleForm.password = 'user'
      }
    },
    'config.theme': function (val) {
      document.body.setAttribute('data-theme', val)
      this.$TOOL.data.set('APP_THEME', val)
    },
    'config.lang': function (val) {
      this.$i18n.locale = val
      this.$TOOL.data.set('APP_LANG', val)
    },
  },
  created () {
    this.$TOOL.data.remove('TOKEN')
    this.$TOOL.data.remove('USER_INFO')
    this.$TOOL.data.remove('MENU')
    this.$TOOL.data.remove('PERMISSIONS')
    this.$TOOL.data.remove('grid')
    // this.$store.commit('clearViewTags')
    // this.$store.commit('clearKeepLive')
    // this.$store.commit('clearIframeList')
  },
  methods: {
    async login () {
      const validate = await this.$refs.loginForm.validate().catch(() => {})
      if (!validate) return false

      this.islogin = true
      const data = {
        username: this.ruleForm.user,
        password: this.$TOOL.crypto.MD5(this.ruleForm.password),
      }
      // 获取token
      const user = await this.$API.auth.token.post(data)
      if (user.code === 200) {
        this.$TOOL.data.set('TOKEN', user.data.token)
        this.$TOOL.data.set('USER_INFO', user.data.userInfo)
      }
      else {
        this.islogin = false
        this.$message.warning(user.message)
        return false
      }
      // 获取菜单
      let menu = null
      if (this.ruleForm.user === 'admin')
        menu = await this.$API.system.menu.myMenus.get()

      else
        menu = await this.$API.demo.menu.get()

      if (menu.code === 200) {
        if (menu.data.menu.length === 0) {
          this.islogin = false
          this.$alert('当前用户无任何菜单权限，请联系系统管理员', '无权限访问', {
            type: 'error',
            center: true,
          })
          return false
        }
        this.$TOOL.data.set('MENU', menu.data.menu)
        this.$TOOL.data.set('PERMISSIONS', menu.data.permissions)
      }
      else {
        this.islogin = false
        this.$message.warning(menu.message)
        return false
      }

      this.$router.replace({ path: '/usercenter' })
      this.$message.success('登录成功')
      this.islogin = false
    },
    configTheme () {
      this.config.theme = this.config.theme === 'default' ? 'dark' : 'default'
    },
    configLang (command) {
      this.config.lang = command.value
    },
  },
}
</script>
<route lang="yaml">
meta:
  layout: login
</route>

<style scoped>
.login_bg {width: 100%;height: 100%;background: #fff;display: flex;}
.login_adv {width: 33.33333%;background-color: #555;background-size: cover;background-position: center center;background-repeat: no-repeat;position: relative;}
.login_adv__title {color: #fff;padding: 40px;}
.login_adv__title h2 {font-size: 40px;}
.login_adv__title h4 {font-size: 18px;margin-top: 10px;font-weight: normal;}
.login_adv__title p {font-size: 14px;margin-top:10px;line-height: 1.8;color: rgba(255,255,255,0.6);}
.login_adv__title div {margin-top: 10px;display: flex;align-items: center;}
.login_adv__title div span {margin-right: 15px;}
.login_adv__title div i {font-size: 40px;}
.login_adv__title div i.add {font-size: 20px;color: rgba(255,255,255,0.6);}
.login_adv__bottom {position: absolute;left:0px;right: 0px;bottom: 0px;color: #fff;padding: 40px;background-image:linear-gradient(transparent, #000);}
.login_main {flex: 1;overflow: auto;display:flex;}
.login-form {width: 400px;margin: auto;padding:20px 0;}
.login-header {margin-bottom: 20px;}
.login-header .logo {display: flex;align-items: center;}
.login-header .logo img {width: 35px;height: 35px;vertical-align: bottom;margin-right: 10px;}
.login-header .logo label {font-size: 24px;}
.login-header h2 {font-size: 24px;font-weight: bold;margin-top: 50px;}
.login-oauth {display: flex;justify-content:space-around;}
.login-form .el-divider {margin-top:40px;}
.login_config {position: absolute;top:20px;right: 20px;}
.el-dropdown-menu__item.selected {color: var(--el-color-primary);}
@media (max-width: 1200px){
  .login-form {width: 340px;}
}
@media (max-width: 1000px){
  .login_main {display: block;}
  .login-form {width:100%;padding:20px 40px;}
  .login_adv {display: none;}
}
</style>
