﻿using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace HoangAn_2280600149.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal TotalPrice { get; set; }
        public string ShippingAddress { get; set; } = "";
        public string? Notes { get; set; }

        [ForeignKey("UserId")]
        [ValidateNever]
        public ApplicationUser? User { get; set; }
        public List<OrderDetail>? OrderDetails { get; set; }
    }
}
