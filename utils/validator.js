const validate = {
  validateEmpty(title, data) {
    if (!data) {
      throw `${title} không được bỏ trống`;
    }
  },
  validatePassword(data) {
    const regex = /^(?=.*[A-Za-z`~:!@#$%^&*)(+=._-])(?=.*\d)[A-Za-z`~:!@#$%^&*)(+=._\d]{6,32}$/;
    if (data.pass === "") {
      throw "Mật khẩu không được bỏ trống";
    } else if (!data.pass.match(regex) || data.pass === data.username) {
      throw "Mật khẩu phải có 6 - 32  ký tự, bao gồm cả chữ và số. Không được trùng với tên tài khoản.";
    }
  },
  validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw "Xác nhận mật khẩu không chính xác";
    }
  },
  validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(email).toLowerCase())) {
      throw "Email không hợp lệ";
    }
  }
}

export default validate;