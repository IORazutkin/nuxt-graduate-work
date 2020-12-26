<template>
  <div class="login">
    <form class="login__form" @submit.prevent="login">
      <div class="input-group" :class="{'error': $v.formData.email.$error}">
        <input
          v-model="$v.formData.email.$model"
          type="email"
          class="field email"
          placeholder="E-mail"
          required
          autofocus
          autocomplete="off"
          @input="$v.$reset"
        >
      </div>
      <div class="input-group" :class="{'error': $v.formData.password.$error}">
        <input
          v-model="$v.formData.password.$model"
          type="password"
          class="field password"
          placeholder="Пароль"
          required
          maxlength="15"
          autocomplete="false"
          @input="$v.$reset"
        >
      </div>
      <div class="input-group">
        <button class="submit-btn" :class="{'error': $v.$error}">
          <span v-if="!$v.formData.password.minLength && $v.formData.$error">Пароль слишком короткий</span>
          <span v-else-if="$v.loginError.$error">Неверный логин или пароль</span>
          <span v-else>Авторизация</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

@Component
export default class extends Vue {
  formData: any = {
    email: '',
    password: ''
  }

  loginError: boolean = false

  login () {
    this.$v.formData.$touch()

    if (this.$v.formData.$error) {
      return
    }

    const formData = new FormData()
    formData.append('username', this.formData.email)
    formData.append('password', this.formData.password)

    this.$axios.$post('/login', formData).then((response: any) => {
      if (response.role.name === 'STUDENT') {
        this.$router.replace('/student')
      } else {
        this.$router.replace('/teacher')
      }
    }).catch(() => {
      this.$v.loginError.$model = true
    })
  }

  validations () {
    return {
      formData: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(15)
        }
      },
      loginError: {
        val (val: boolean) {
          return !val
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  @include bp-max($mq-mobile-max) {
    justify-content: stretch;
    align-items: stretch;
  }

  &__form {
    width: 100%;
    padding: 24px 16px;
    background-color: #f0f0f0;

    @include bp-min($mq-tablet-min) {
      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
      max-width: 516px;
    }
  }
}

.input-group {
  &.error .field {
    &.password {
      background-image: url(~@/assets/img/icons/key_error.svg);
    }
  }
}

.field {
  &.email {
    background-image: url(~@/assets/img/icons/user.svg);

    &:focus {
      background-image: url(~@/assets/img/icons/user_focus.svg);
    }
  }

  &.password {
    background-image: url(~@/assets/img/icons/key.svg);

    &:focus {
      background-image: url(~@/assets/img/icons/key_focus.svg);
    }
  }
}
</style>
