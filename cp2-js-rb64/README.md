# Creative Project 2 Project Specification
## Overview
For your second Creative Project, you will get a bit more practice with responsive flexbox layout (CSS)
in addition to what we're learning about JavaScript (JS) to add interactivity a web page using the
DOM and event handlers. As a creative project, you have freedom to have more ownership in your work,
as long as you meet the requirements listed below.

As a reminder, assignments will alternate between creative projects (CPs) and more formal homework
assessments (HWs). We have designed assignments to support each of the 5 modules of this
course, and for creative projects to prepare you for the following HW in each module.

That said, we encourage you to explore the new material covered in class, as well as
related (but optional) content we may link to along the way, as
long as you follow the CSE 154 code quality guidelines. This is your chance to:

1. Continue to build a a websites that you can link to on your resume or code
   portfolio (CPs can be public, most HWs cannot be).
2. Ask instructors and/or TAs about features you want to learn how to implement (we can
   provide more support for CPs than HWs) and ask for feedback/ideas on Piazza.
3. Apply what you're learning in CSE 154 to projects you are personally interested in and
   may use outside of just a CSE 154 assignment.
4. Optionally showcase your CP work on the CSE 154 19Au CP showcase
5. Get feedback on code quality when learning new technologies in CSE 154 to implement for
   the corresponding HW, which will be worth more points.

In past quarters, some students have built upon their Creative Project each week. You may
choose to do a new website for each CP, or build on a single project, as long as you meet
each CP's requirements.

## Ideas for CP2
As long as you meet the requirements outlined below, you have freedom in what kind of
website you create. Here are some ideas for Autumn 2019 (Your instructor is more than
happy to help discuss more ideas in their office hours!):
* Continue to extend your portfolio page to add interactivity in some way.
* Write a website to implement drag/drop features.
* Write a to-do list or an option list where you can add or remove items.
* Write something where you add or remove paragraphs or images to/from your page.
* Build a form that adds new features/options based on user input.
* Build a "create your own adventure" game that responds to the users choices.
* Implement a timeout/interval feature, etc.
* Write a website to visualize data structures like arrays, lists, or maps.
* Write a website to solve math/science/etc. formulae.
* You might find Section examples helpful for some inspiration! But your work must be your own - credit will not be given to submissions that reuse solutions from class (including Section/Lecture).

## Getting Started
This Creative Project pieces together the languages you've learned in Module 1 as well as the basics of JavaScript you're learning about in Module 2 (responding to events, DOM manipulation, etc.). Knowing where to start with JS for the first time can be difficult (but exciting!) so this is how we suggest breaking down this assignment:
1. **Start with the HTML/CSS**: Write the HTML/CSS for your page first. This gives you a front end to work with and reference before implementing any JavaScript code. Keep the DOM tree in mind as you are structuring your HTML. This will be useful as you move into JS implementation. You should aim to invest about 25-30% of the time you dedicate to CP2 on this part.
    * Tip: When support user interactivity to a webpage, you may find it useful to think about different UI elements (like buttons or input boxes) and can find a good list of common ones [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/The_native_form_widgets) for some inspiration.
2. **Break Down the UI**: This requires no coding! Remember, JavaScript is _event driven_ meaning that everything occurs in response to an event such as a "click" of a button, a "change" of a radio button, a "keypress", or a window "load." Spend the time thinking about what you want to implement and how you will do that. Something that you may find helpful is filling out a table like this. An example for a hypothetical page has been filled out for you:

  | event | element listening to event | response/elements changed |
|-------|---------|---------|
| click  | img with id `#kitty`  | img changes from cat image to dog image  |
| ...  | ... | ...  |

  The event in this case is a "click" event that takes place on an image with id `#kitty`. The response functionality to the event is a change in the image from a cat to a dog.

  Invest about 40% of the total time you expect to spend on this assignment on this part.

3. **Write the JavaScript**: Finally you are ready to write the JavaScript. Take it piece by piece and refer back to the brainstorming you did. If you need to reference proper syntax or forgot how to do something shown in lecture refer back to the slides/examples. Also, as you are coding, remember to use the console as demonstrated in lecture. It is a great way for you to experiment with JavaScript and get instant feedback. Aim to invest about 30-35% of the total time you expect to spend on the assignment on this part.
    - _note_: we have just brushed the surface with JavaScript and we will be diving deep into the many useful features of the language over the next few weeks. To start, focus on perfecting steps 1 and 2 and use what you learned so far to get more experience turning your brainstorming into an implementation. This will make part 3 much more approachable as you become more familiar with JavaScript, and take advantage of OH/WPL/Piazza if you'd like to talk through some JS implementation strategies!

## External Requirements
* Your project must include the following three files at a minimum:
  * `index.html` - main page of your website
  * `styles.css` - file to style your `.html` file
  * `index.js` - containing your JavaScript code
* You must set a rule in your `styles.css` so that _at least_ one element is a flex container.
  - Additionally, you must use at least one of the flex properties (such as `justify-content`, `align-items`, `flex-wrap`) to create a more responsive layout.
* Your website must contain at least HTML page linked to `index.js` to respond to page events as we've discussed in class. It must respond to a page UI event (e.g. changes to a dropdown option or a button click, etc.) or a
     mouse or keyboard event (refer to **Keyboard Events** and **Mouse Events** from [here](https://developer.mozilla.org/en-US/docs/Web/Events)). If you would like to explore an event we don't cover in CSE154 on your project but don't know where to get started, feel free to ask.
* At least one of your event handler functions should change the document (DOM) in some way using `element.appendChild()`, `element.removeChild()`, or `element.replaceChild()`
* Event handler functions should be non-trivial, meaning it must be possible they change the page or program "state" in response to the event (i.e. a `console.log` statement or unused variable assignment is trivial)
    * There are many different ways JS can be used to respond work with the page. If you are unsure about this requirement for your Creative Project, ask!
* Optionally, we also suggest practicing using JS to dynamically modify a `classList` of an element (add/remove a class that is defined in a linked CSS file). This is a good chance to practice for HW2.
* You should implement _at minimum_ one named function in your `.js` code. All code in `index.js` must be your own work (you may use the `id`, `qs`, and `qsa` functions shown in lecture though).
* Make sure to test your webpage UI so that it works properly when a user interacts with page elements - you aren't expected to handle _all_ possible error cases, but part of your grade will come from being able to respond to an user event without an error.
* Tip: You can find a list of some different event types your page can listen for
  [here](https://developer.mozilla.org/en-US/docs/Web/Events) (not comprehensive) and post on
  Piazza or go to Office Hours if you want to explore those not covered in class!

## Internal Requirements
* Your HTML, CSS, and JavaScript should demonstrate good code quality as demonstrated in class and
  detailed in the [CSE 154 Code Quality Guidelines](https://courses.cs.washington.edu/courses/cse154/codequalityguide/_site/). Part of your grade will come from using consistent indentation, proper naming conventions, curly brace locations, etc. Lecture/section examples
demonstrate JS naming/whitespace conventions in this course, but there are more examples [here](https://courses.cs.washington.edu/courses/cse154/codequalityguide/_site/javascript/#whitespace-before-blocks).
* When adding interactivity to your website, you should handle any events (like a mouse event, keyboard event, timer, etc.)
  by responding them using a JavaScript function(s) in your `.js` file. You should not have any JavaScript code in your HTML and you should not have any HTML tags as strings in your JavaScript code (e.g. `el.innerHTML = "<p>Foo</p>";`).
* Your `index.js` file should be linked to your `index.html` or other `.html` files using
   `<script src="...">` in the HTML `<head>`.
* Links to your `.html`,  `.css` and `.js` files should be **relative links**, not absolute.
* Minimize styling in JS (e.g. changing the `.style` property of elements) - prefer adding/removing classes to DOM elements instead, and
  style the classes in your CSS. Remember that there is an exception when dynamically generating values for styles or positions that are not reasonably factored out in CSS.
* Any `.js` code you use must use the module-global pattern (recall the module-global template) and `"use strict";`.
* Your page should have a `window.addEventListener("load", functionName)` as shown in lecture/section/lab (use an appropriate `functionName`).
* Decompose your JS by writing smaller, more generic functions that complete one task rather than a few larger "do-everything" functions.
* Localize your variables as much as possible. You should not use any global variables (outside the module pattern) - see [Code Quality Guide](https://courses.cs.washington.edu/courses/cse154/codequalityguide/_site/javascript/#module-pattern) for reference.
* Only use module-global variables whenever absolutely necessary.
* Use `const` with `UPPER_CASED` naming conventions (instead of `let`) for program constants (e.g. a file path to your images if you are working with many images in your JS).
* HTML and CSS files must be well-formed and pass the validators/linters.
* Your JS code must pass [ESLint](https://oxford.cs.washington.edu/cse154/jslint/) with no errors. The JavaScript linting will also occur every time you commit and push but the website may be helpful to use as you are developing.
* If you want to explore other JS features beyond what we've taught in class, you must cite what resources you used to learn them in order to be eligible for credit. We strongly encourage students to ask the staff for resources instead of finding online tutorials on their own (some are better than others).
* Your page should include
[school appropriate content](https://courses.cs.washington.edu/courses/cse154/19au/syllabus/index.html#academic-conduct)
and [copyrights and citations](https://courses.cs.washington.edu/courses/cse154/19au/syllabus/index.html#copyright). If we find plagiarism in CPs or inappropriate content, **you will be ineligible for any points on the CP**. Ask the instructor if you're unsure if you're work is appropriate/correctly cited.

## Documentation
* Place a comment header in each file with your name, section, and a brief description of the file's purpose in your website. An example `.js` file comment is given below:

    ```
    /*
     * Name: Mowgli Hovik
     * Date: April 1, 2019
     * Section: CSE 154 AL
     *
     * This is the JS to implement the UI for my cryptogram generator, and generate
     * different types of ciphers from user input.
     */
    ```
* Use [JSDoc](http://usejsdoc.org/) to document _all_ of your JS functions with `@param`, `@returns` as discussed in the Code Quality Guide [here](https://courses.cs.washington.edu/courses/cse154/codequalityguide/_site/javascript/#comments-function-header).

## Grading
This CP will be out of 8 points and will likely (subject to adjustments) be distributed as:
* External Correctness (4 pts) - The external requirements listed in this document are met.
* Internal Correctness (3 pts) - The internal requirements listed in this document are met.
* Documentation (1 pts) - The style and documentation requirements in this document are met.  

## Late Day Challenge
You can earn one extra late day if your JavaScript responses to an event once after a delay (using `setTimeout`) or repeatedly (using `setInterval`). These may not execute the same function as the one in the External Requirements and the functions must be non-trivial (e.g. it must be possible that your page or module-global JS variables are updated as a result of the function).
