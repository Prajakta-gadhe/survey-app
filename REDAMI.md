# Create Survey App

## Team A-21

### Project Members Details
| Name                          | Mail ID                          |
|-------------------------------|----------------------------------|
| Gadhe Prajakta Sandip          | prajaktagadhe097@gmail.com       |
| Devadhe Omkar Shrikant         | omkardevadhe@gmail.com           |
| Gade Nita Shivaji              | nitagade19@gmail.com             |
| Ugale Chandrashekhar Bharat    | chandrashekharugale45@gmail.com  |
| Chaitanya Devdhe               | chaitanyadevde@gmail.com         |

## Overview

This project consists of an application that allows users to create a survey form with a registration page, sign-up page, and a survey form itself. The application utilizes HTML, CSS, and JavaScript to provide a user-friendly interface.

### File Structure
- `settings.json`
- `frontpagesurvey.html`
- `registration.css`
- `registration.html`
- `signuppage.html`
- `dynamicquestion.js`
- `styleofquebank.css`

---

## 1. `frontpagesurvey.html`
### Description
This HTML file represents a survey form with a navigation bar and dynamic question addition functionality.

### Key Sections
- **Navbar Section**: Contains icons for various functionalities; when the profile icon is clicked, the sign-up page opens. It also includes the registration page.
- **Form Section**: Includes input fields for the form title and description, as well as dynamic question creation.
- **Toolbar**: Provides buttons for adding questions, uploading files, and adding media.

### Scripts
- **workingoption.js**: Handles dynamic question and option management.
- **dynamicQuestion.js**: Manages the addition and removal of questions and options.

---

## 2. `registration.css`
### Description
This CSS file styles the registration form.

### Key Styles
- **General Reset**: Resets margin and padding for all elements.
- **Container Styles**: Styles for the form container, including background color, border radius, and box shadow.
- **Responsive Design**: Adjusts the container width for smaller screens.

---

## 3. `registration.html`
### Description
This HTML file contains a registration form for new users.

### Key Features
- Input fields for name, mobile number, email, password, and confirm password.
- A submit button to register the user.

### Structure
- **Form Group**: Each input field is wrapped in a form group for better styling and layout.

---

## 4. `signuppage.html`
### Description
This HTML file provides a sign-up form for users to log in.

### Key Features
- Input fields for email and password.
- A checkbox for "Remember me" functionality.
- A link to the registration page for new users.

### Styles
- Inline CSS for basic styling of the form container and background.

---

## 5. `workingoption.js`
### Description
This JavaScript file manages the dynamic addition and removal of questions and options in the survey form.

### Key Functions
- **addQuestion()**: Adds a new question to the form.
- **addOption(button)**: Adds a new option to the current question.
- **addOther(button)**: Adds an "Other" option to the current question.
- **removeOption(button)**: Removes an option from the question.

### Event Listeners
- Listens for clicks on dropdown icons to toggle visibility.

---

## 6. `styleofquebank.css`
### Description
This CSS file styles the survey form and its components.

### Key Styles
- **Navbar Styles**: Styles for the navigation bar, including layout and hover effects.
- **Form Styles**: Styles for the form container, question sections, and submit button.
- **Responsive Styles**: Adjusts styles for smaller screens to ensure usability.

---

## Features

1. **User Authentication & Profiles**
   - **Sign Up/Login**: Users can create an account or log in to save their surveys and responses.
   - **Profile Management**: Users can manage their profile, such as personal information and preferences.

2. **Survey Creation & Customization**
   - **Question Types**: Support for various question formats like multiple choice, true/false, rating scales, text input, and dropdowns.

3. **Survey Distribution**
  
