using System;
using System.Collections.Generic;

namespace HoangAn_2280600149.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string UserId { get; set; } = "";
        public List<CartItem> Items { get; set; } = new List<CartItem>();
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
