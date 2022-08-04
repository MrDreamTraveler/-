const form = layui.form
// 自定义校验规则
form.verify({
  nickname: (val) => {
    if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！'
  },
  email: [/@/, '邮箱格式输入错误'],
})

const layer = layui.layer
// 初始化用户信息
const initUserInfo = () => {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: (res) => {
      const { status, message, data } = res
      if (status !== 0) return layer.msg(message)
      form.val('formUserInfo', data)
    },
  })
}

initUserInfo()

$('#restBtn').click(function (e) {
  e.preventDefault()
  initUserInfo()
})

$('.layui-form').submit(function (e) {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: form.val('formUserInfo'),
    success: (res) => {
      const { status, message } = res
      if (status !== 0) return layer.msg(message)
      // 调用父页面渲染函数
      layer.msg('更新用户信息成功！')
      window.parent.getUserInfo()
    },
  })
})
