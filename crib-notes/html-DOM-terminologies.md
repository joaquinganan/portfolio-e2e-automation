# Playwright DOM Fundamentals - Notes

## 1. Purpose of the Lesson
- Before learning Playwright locators and actions, it is important to understand **HTML and DOM fundamentals**.
- Proper **DOM terminology** helps with:
  - Writing accurate locators
  - Using Playwright commands correctly
  - Understanding why assertions or interactions succeed or fail

---

## 2. HTML Tags
- HTML elements are defined using **tags**.
- Tags:
  - Start with `<` and end with `>`
  - Usually come in **pairs**:
    - Opening tag: `<input>`
    - Closing tag: `</input>`
  - Closing tags include a **forward slash** (`/`)

---

## 3. HTML Attributes and Values
- Attributes are written **inside the opening tag**.
- Attribute structure:
  - **Attribute name** (e.g., `placeholder`, `class`, `id`)
  - **Attribute value** (optional)
- Examples:
  - `input` → attribute without value
  - `placeholder="email"` → attribute with value
- In browser dev tools:
  - Attribute names are typically highlighted in **green**
  - Attribute values are typically highlighted in **blue**

---

## 4. ID and Class Attributes
- `id` and `class` are **HTML attribute names** with special roles.
- `class` attributes:
  - Can contain **multiple values**
  - Values are **separated by spaces**
  - Each value can be used **independently** as a CSS locator
- This is important when locating elements in Playwright.

---

## 5. Table Structure in HTML
- Common table-related tags:
  - `<tbody>` → table body
  - `<tr>` → table row
  - `<td>` → table column (cell)
- Table elements follow the same **opening and closing tag** rules.

---

## 6. HTML Text vs Properties
- **HTML text**:
  - Appears **between opening and closing tags**
  - Is visible directly in the DOM
- **Properties**:
  - Not always visible between tags
  - Can exist as element properties or attribute values
- Important distinction:
  - If text exists between tags in the DOM → it is **text**
  - If not → it is likely a **property**
- This distinction matters when:
  - Extracting text from a page
  - Asserting text in tests
- Best practice:
  - Inspect the **DOM** to confirm where the value exists.

---

## 7. Nested Elements and DOM Indicators
- Three dots (`...`) inside an element indicate **nested content**.
- Arrow icon (▶) indicates the element is **collapsed**.
  - Clicking it expands the nested DOM structure.

---

## 8. DOM Relationships Between Elements
Using a **key (anchor) element** as reference:

- **Parent elements**
  - Located above the key element
- **Child elements**
  - Located inside the key element
  - Typically indented to the right
- **Sibling elements**
  - Located at the same level
  - Positioned side by side
- Examples:
  - Multiple `<td>` elements in the same row → siblings
  - Multiple `<tr>` elements in the same table → siblings

---

## 9. DOM Terminology Summary
- HTML DOM consists of:
  - HTML tags
  - HTML attributes
  - Attribute values
- `class` and `id` are attribute names.
- Class attributes can contain **multiple space-separated values**.
- HTML tags usually come in **opening/closing pairs**.
- Text between tags is **HTML text**.
- DOM relationships:
  - **Parent** → above the element
  - **Child** → inside the element
  - **Sibling** → same level, side by side