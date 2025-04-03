﻿using System.ComponentModel.DataAnnotations;

namespace HoangAn_2280600149.Models.AccountViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Email không được để trống")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        [Display(Name = "Email")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "Mật khẩu không được để trống")]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; } = "";

        [Display(Name = "Ghi nhớ đăng nhập?")]
        public bool RememberMe { get; set; }

        public string? ReturnUrl { get; set; }
    }
}
