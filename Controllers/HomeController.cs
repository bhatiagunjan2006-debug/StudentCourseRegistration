using Microsoft.AspNetCore.Mvc;
using StudentCourseRegistration.Models;

namespace StudentCourseRegistration.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var students = StudentController.Students;
            ViewBag.Courses = StudentController.Courses;

            // Extra data for the premium dashboard (read-only, no change to storage)
            ViewBag.CourseCounts = StudentController.Courses
                .ToDictionary(c => c, c => students.Count(s => s.Course == c));
            ViewBag.Recent = students.AsEnumerable().Reverse().Take(5).ToList();

            return View(students.Count);  // model = total students
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
