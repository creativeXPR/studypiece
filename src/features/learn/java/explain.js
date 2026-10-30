// Plain-English notes for the compiler messages beginners meet most. The raw javac
// message is always shown too: reading it is a skill the course teaches.

const RULES = [
  [/';' expected/, 'A statement is missing its semicolon `;`. Java reports the spot just after where it expected one.'],
  [/cannot find symbol/, 'Java doesn’t know this name here. Check the spelling and capitals, and that it is declared where this code can see it.'],
  [/missing return statement/, 'This method promises a value, so every path through it must end in `return`.'],
  [/reached end of file while parsing/, 'A closing `}` is missing. Every `{` needs a partner.'],
  [/illegal start of (expression|type)|not a statement|<identifier> expected/, 'Something just before this point is incomplete, often a missing `)`, `}` or `;`.'],
  [/'else' without 'if'/, 'This `else` has no `if` to belong to. Look for a stray `;` or a missing `{` before it.'],
  [/possible lossy conversion from (\w+) to (\w+)/, 'A wider type can’t squeeze into a narrower one by itself. Change the variable’s type or cast it, e.g. `(int)`.'],
  [/incompatible types/, 'The value’s type doesn’t match what this spot expects.'],
  [/non-static (method|variable) .* cannot be referenced from a static context/, '`static` code belongs to the class, not to an object. Create an object first, or make the member `static`.'],
  [/might not have been initialized/, 'This variable is read before it is given a value on every path.'],
  [/cannot assign a value to final variable/, 'A `final` variable is set once and can never change.'],
  [/is not abstract and does not override abstract method/, 'A concrete class must give a body to every abstract method it inherits (or be declared `abstract` itself).'],
  [/call to (super|this) must be first statement/, '`super(...)` or `this(...)` must be the very first line of a constructor.'],
  [/has private access/, '`private` members can only be used inside their own class. Use a getter or setter instead.'],
  [/unreported exception (\w+); must be caught or declared to be thrown/, 'This is a checked exception: wrap the call in `try`/`catch`, or add `throws` to the method.'],
  [/unreachable statement/, 'This line can never run, because an earlier `return`, `break` or `throw` always leaves first.'],
  [/class (\w+) is public, should be declared in a file named/, 'Only one class per file can be `public`, and the file must share its name.'],
  [/cannot be applied to given types/, 'The arguments don’t match the method’s parameters: check how many there are and their types.'],
  [/no interface expected here/, 'A class `extends` a class but `implements` an interface.'],
  [/interface expected here/, 'Only interfaces can go after `implements`. For a class, use `extends`.'],
  [/already defined/, 'This name is declared twice in the same place.'],
  [/(\w+) is abstract; cannot be instantiated/, 'You can’t create an object of an abstract class or an interface with `new`. Create a concrete subclass instead.'],
  [/unclosed string literal/, 'A string is missing its closing `"`.'],
  [/bad operand types for binary operator/, 'This operator can’t be used with these types (for example comparing a `String` with `==` to a number).'],
];

export function explainError(msg) {
  for (const [re, text] of RULES) if (re.test(msg)) return text;
  return null;
}
