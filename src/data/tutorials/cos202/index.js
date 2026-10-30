// COS 202 interactive tutorial: Advanced Object-Oriented Programming (Java).
// Lessons mix explanations with Java screens (code, bug, predict, fill, better).
// (A lesson entry without `sections` shows as "Coming soon".)
import recursion from './recursion';

const soon = (id, title, covers) => ({ id, title, covers });

export default {
  code: 'COS 202',
  title: 'Advanced Object-Oriented Programming (Java)',
  chapters: [
    {
      n: 0,
      title: 'Java Toolkit',
      by: 'Program anatomy, arrays, methods and overloading',
      lessons: [
        soon('anatomy', 'Program anatomy, types and control flow', 'Classes and main, primitive types, if/switch, loops'),
        soon('arrays', 'Arrays and 2D arrays', 'Declaring, traversing, min/max, matrices'),
        soon('methods', 'Methods and overloading', 'Parameters, return values, overloading'),
      ],
    },
    {
      n: 1,
      title: 'Recursion and Algorithms',
      by: 'Recursion, searching and sorting',
      lessons: [
        recursion,
        soon('searching', 'Searching', 'Linear and binary search'),
        soon('sorting', 'Sorting', 'Selection, bubble and insertion sort'),
      ],
    },
    {
      n: 2,
      title: 'Classes and Objects',
      by: 'Objects, constructors, encapsulation',
      lessons: [
        soon('classes', 'Classes, objects and attributes', 'Blueprints, new, dot syntax, null'),
        soon('constructors', 'Constructors and this', 'Default, parameterised, copy and private constructors'),
        soon('encapsulation', 'Encapsulation', 'private fields, getters and setters, validation'),
      ],
    },
    {
      n: 3,
      title: 'Modifiers',
      by: 'Access and non-access modifiers',
      lessons: [
        soon('access', 'Access modifiers', 'public, private, protected, default'),
        soon('final-static', 'final, static and friends', 'Constants, shared counters, abstract, transient, synchronized, volatile'),
      ],
    },
    {
      n: 4,
      title: 'Inheritance and Polymorphism',
      by: 'extends, super, overriding',
      lessons: [
        soon('inheritance', 'Inheritance and IS-A', 'extends and the five inheritance types'),
        soon('super', 'super and constructor chains', 'Calling the parent constructor and methods'),
        soon('polymorphism', 'Overriding and polymorphism', 'Overriding vs overloading, runtime polymorphism'),
      ],
    },
    {
      n: 5,
      title: 'Abstraction and Interfaces',
      by: 'Abstract classes, interfaces, lambdas',
      lessons: [
        soon('abstract', 'Abstract classes', 'Abstract and concrete methods'),
        soon('interfaces', 'Interfaces', 'implements, multiple interfaces'),
        soon('modern-interfaces', 'Default, static and private methods', 'JDK 8/9 features, functional interfaces, lambdas'),
      ],
    },
    {
      n: 6,
      title: 'Using the Java API',
      by: 'Packages, Strings, ArrayList, iterators',
      lessons: [
        soon('api', 'Packages, Strings and wrappers', 'import, String methods, parsing numbers'),
        soon('collections', 'ArrayList, Stack and Queue', 'Growable lists and the collection classes'),
        soon('iterators', 'Iterators and for-each', 'Walking through collections'),
      ],
    },
    {
      n: 7,
      title: 'Exceptions',
      by: 'try/catch, throw and throws',
      lessons: [
        soon('try-catch', 'try, catch and finally', 'Checked vs unchecked, common exceptions'),
        soon('throwing', 'throw, throws and custom exceptions', 'Propagation and your own exception classes'),
      ],
    },
    {
      n: 8,
      title: 'Swing GUI and Events',
      by: 'Windows, components, listeners, threads',
      lessons: [
        soon('swing', 'Windows and components', 'JFrame, JLabel, JTextField, JButton, JComboBox, JTextArea, layouts'),
        soon('events', 'Events and listeners', 'ActionListener, getText, setText, JOptionPane'),
        soon('threads', 'Threads basics', 'Thread, Runnable, synchronized, responsive GUIs'),
      ],
    },
    {
      n: 9,
      title: 'Exam Lab',
      by: 'Error catalogue and full programs',
      lessons: [
        soon('error-catalogue', 'The error catalogue', 'The most common syntax and semantic errors, timed drill'),
        soon('build-apps', 'Build two full apps', 'Student records and payment processing, step by step'),
      ],
    },
  ],
};
