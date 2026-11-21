using System.ComponentModel.DataAnnotations;

namespace StudentCourseRegistration.Models
{
    public class Student
    {
        [Required(ErrorMessage = "Student ID is required.")]
        [Range(1, 99999999, ErrorMessage = "Student ID must be a positive number (max 8 digits).")]
        [Display(Name = "Student ID")]
        public int? Id { get; set; }

        [Required(ErrorMessage = "Full name is required.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 50 characters.")]
        [Display(Name = "Full Name")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        [Display(Name = "Email Address")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please select a course.")]
        public string Course { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please select a semester.")]
        [Range(1, 8, ErrorMessage = "Semester must be between 1 and 8.")]
        public int? Semester { get; set; }
    }
}
