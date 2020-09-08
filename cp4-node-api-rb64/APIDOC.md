# Shape Calculator API Documentation
The Shape Calculator API calculates the area and perimeter of some specific shapes and returns the values.

## Get area and circumference of a circle
**Request Format:** /circle

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns the area and perimeter of the circle with the specified radius.


**Example Request:** /circle?radius=1

**Example Response:**

```json
{
	"circumference":6.283185307179586,
	"area":3.141592653589793
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
	- If passed in anything other than a number, returns an error with the message: `Enter a number`
	- If passed in 0 or a negative number, returns an error with the message: `Enter a positive number`

## Get area and perimeter of a rectangle
**Request Format:** /rectangle

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns the area and circumference of the rectangle with the specified width and height.

**Example Request:** /rectangle?width=2&height=4

**Example Response:**
```json
{
	"perimeter":12,
	"area":8
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
	- If passed in anything other than a number, returns an error with the message: `Enter a number`
	- If passed in 0 or a negative number, returns an error with the message: `Enter a positive number`

## Get area and perimeter of a triangle
**Request Format:** /triangle

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns the area and circumference of the triangle with the specified side.

**Example Request:** /triangle?side=1

**Example Response:**
```json
{
	"perimeter":3,
	"area":0.4330127018922193
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
	- If passed in anything other than a number, returns an error with the message: `Enter a number`
	- If passed in 0 or a negative number, returns an error with the message: `Enter a positive number`
