using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HoangAn_2280600149.Models
{
    public enum Gender
    {
        [Display(Name = "Nam")]
        Male,
        [Display(Name = "Nữ")]
        Female,
        [Display(Name = "Khác")]
        Other
    }

    public class ApplicationUser : IdentityUser
    {
        // IdentityUser đã có Id

        [Required]
        [StringLength(50)]
        [Display(Name = "Họ và tên")]
        public string FullName { get; set; } = "";

        [Required]
        [Display(Name = "Ngày sinh")]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; } = DateTime.Now;

        [StringLength(200)]
        [Display(Name = "Địa chỉ")]
        public string Address { get; set; } = "";

        [Display(Name = "Ảnh đại diện")]
        public string? AvatarUrl { get; set; } = "/images/users/default-avatar.png";

        [Display(Name = "Ngày tạo")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Display(Name = "Trạng thái")]
        public bool IsActive { get; set; } = true;

        [Required]
        [Display(Name = "Giới tính")]
        public Gender Gender { get; set; } = Gender.Male;

        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số")]
        [Display(Name = "Số điện thoại")]
        public override string? PhoneNumber { get; set; }
    }
}
