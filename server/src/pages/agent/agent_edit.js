let that;
let list = {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        checkPwd: '',
        dtype: '',
        a_id: '',
        phone: '',
        deadline: ''
      },
      formData2: {
        username: '',
        password: '',
        checkPwd: '',
        dtype: '',
        a_id: '',
        phone: '',
        deadline: ''
      },
      utype: [{
        label: '管理员',
        value: 1
      }, {
        label: '校园代理',
        value: 2
      }],
      loading: false
    }
  },
  mounted() {
    that = this
  },
  methods: {
    onSubmit() {
      this.loading = true
      const date = new Date(this.formData.deadline); // 将字符串解析成Date对象
      const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:${date.getSeconds().toString().padStart(2,'0')}`; // 格式化日期
      let formData = {
        username: this.formData.username,
        password: this.yzy.encrypt(this.formData.password),
        checkPwd: this.yzy.encrypt(this.formData.checkPwd),
        a_id: this.formData.a_id,
        dtype: this.formData.dtype,
        phone: this.formData.phone,
        deadline: formattedDate
      }
      formData.password = this.yzy.encrypt(formData.password)
      formData.checkPwd = this.yzy.encrypt(formData.checkPwd)
      this.yzy.post('user/register', formData, function (res) {
        that.loading = false
        if (res.code == 1) {
          that.$message.success(res.msg)
          that.formData = that.formData2
        } else {
          that.$message.error(res.msg)
        }
      })
    }
  }
}
module.exports = list
