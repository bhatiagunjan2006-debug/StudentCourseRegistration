using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using StudentCourseRegistration.Models;

namespace StudentCourseRegistration.Controllers
{
    public class StudentController : Controller
    {
        // In-memory storage (static => shared by all requests while the app runs)
        public static readonly List<Student> Students = new();

        public static readonly string[] Courses =
        {
            "B.Tech Computer Engineering",
            "B.Tech Information Technology",
            "B.Tech Electrical Engineering",
            "B.Tech Mechanical Engineering",
            "B.Tech Civil Engineering",
            "BCA",
            "MCA"
        };

        // GET: /Student  or /Student/Index
        public IActionResult Index()
        {
            return View(Students);   // Controller -> View (model passing)
        }

        // GET: /Student/Create
        [HttpGet]
        public IActionResult Create()
        {
            LoadDropdowns();
            return View(new Student());
        }

        // POST: /Student/Create  (model binding fills 'student' from the form)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Student student)
        {
            // Business rule: Student ID must be unique
            if (student.Id.HasValue && Students.Any(s => s.Id == student.Id))
            {
                ModelState.AddModelError(nameof(Student.Id), "This Student ID is already registered.");
            }

            if (!ModelState.IsValid)
            {
                LoadDropdowns();
                return View(student);     // same form + error messages
            }

            Students.Add(student);
            TempData["Success"] = $"{student.Name} was registered successfully!";
            return RedirectToAction(nameof(Index));
        }

        // GET: /Student/Details/101
        public IActionResult Details(int id)
        {
            var student = Students.FirstOrDefault(s => s.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            return View(student);
        }

        private void LoadDropdowns()
        {
            ViewBag.Courses = new SelectList(Courses);
            ViewBag.Semesters = new SelectList(Enumerable.Range(1, 8));
        }
    }
}
