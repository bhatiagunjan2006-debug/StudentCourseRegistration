# Marwadi University – Student Registration Portal (ASP.NET Core MVC)

Run:  `dotnet run`   (then open the URL shown, e.g. https://localhost:7xxx)
Or open the folder in Visual Studio 2022 and press F5 / Ctrl+F5.
If your SDK is not .NET 8, change `<TargetFramework>` in the .csproj (net9.0 / net10.0).

Bootstrap, icons, fonts and jQuery validation load from CDNs, so internet is needed for full styling.

## What changed in the redesign
- Backend (Models, StudentController, routing, validation, duplicate-ID rule) is unchanged.
- HomeController: Index now also passes per-course counts and recent registrations; Error returns a styled view.
- New theme: Midnight Navy, Royal Blue, Champagne Gold, glassmorphism cards (wwwroot/css/site.css).
- Register page: live preview card + progress steps. Student list: search and course/semester filters.
- Details page: term label and print button. Scroll-reveal animations and animated counters.
