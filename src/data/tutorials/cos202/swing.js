// COS 202 · Swing GUI and events · Lesson 1: windows, components and layouts.

export default {
  id: 'swing',
  title: 'Windows and components',
  covers: 'JFrame, JLabel, JTextField, JButton, JComboBox, JTextArea, JScrollPane, JPanel, FlowLayout, BorderLayout, GridLayout',
  minutes: 14,
  sections: [
    {
      name: 'Building a window',
      terms: [
        ['JFrame', 'The window. Set a size or call `pack()`, set the close operation, then `setVisible(true)`.'],
        ['Components', '`JLabel` (text), `JTextField` (one line in), `JTextArea` (many lines), `JButton`, `JComboBox` (drop-down), `JScrollPane` (adds scrollbars).'],
        ['JPanel', 'An invisible container that groups components, with its own layout.'],
        ['Layout manager', 'Decides where components go. `FlowLayout` (in a row), `BorderLayout` (five regions), `GridLayout` (equal cells).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Swing GUI and events · Lesson 1',
          title: 'A window in six steps',
          body: 'Swing lives in `javax.swing`, and layouts live in `java.awt`:\n\n`JFrame f = new JFrame("Title");`\n\n`f.setLayout(new FlowLayout());`\n\n`f.add(new JButton("Pay"));`\n\n`f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);`\n\n`f.pack();`\n\n`f.setVisible(true);`\n\nWithout that last line, you’ll never see anything.',
          cta: 'Meet the parts',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which component would you use?',
          buckets: [
            { id: 'field', label: 'JTextField' },
            { id: 'area', label: 'JTextArea' },
            { id: 'combo', label: 'JComboBox' },
            { id: 'label', label: 'JLabel' },
          ],
          items: [
            { text: 'The user types an amount', bucket: 'field', why: 'One line of input: `JTextField`.' },
            { text: 'Show a full student profile', bucket: 'area', why: 'Many lines of text: `JTextArea`.' },
            { text: 'Choose Card or Cash', bucket: 'combo', why: 'A drop-down of choices: `JComboBox`.' },
            { text: 'The word “Amount:” beside a box', bucket: 'label', why: 'Fixed text: `JLabel`.' },
            { text: 'Choose a grade from A to F', bucket: 'combo', why: 'A fixed list means no invalid input.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'Order the steps to show a window',
          items: [
            'Create the `JFrame`',
            'Set its layout',
            'Create and `add` the components',
            '`setDefaultCloseOperation`',
            '`pack()` or `setSize`',
            '`setVisible(true)`',
          ],
          explain: '`setVisible(true)` goes last, so the window appears complete.',
        },
        {
          type: 'sort',
          eyebrow: 'Layouts',
          prompt: 'Which layout does each describe?',
          buckets: [
            { id: 'flow', label: 'FlowLayout' },
            { id: 'border', label: 'BorderLayout' },
            { id: 'grid', label: 'GridLayout' },
          ],
          items: [
            { text: 'Left to right, wrapping like text', bucket: 'flow', why: '**FlowLayout** is the default for a `JPanel`.' },
            { text: 'NORTH, SOUTH, EAST, WEST and CENTER', bucket: 'border', why: '**BorderLayout** is the default for a `JFrame`.' },
            { text: 'Rows and columns of equal cells', bucket: 'grid', why: '`new GridLayout(3, 2)` is 3 rows, 2 columns.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'The invisible window',
          body: 'This should show a payment window with a box, a drop-down and a button.',
          code: `import javax.swing.*;
import java.awt.*;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Payment");
        JTextField amount = new JTextField(10);
        JComboBox<String> method = new JComboBox<>(new String[] {"Card", "Cash"});
        JButton pay = new JButton("Pay");
        frame.setLayout(new FlowLayout);
        frame.add(amount);
        frame.add(method)
        frame.add(pay);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(false);
    }
}`,
          errors: [
            { line: 10, kind: 'syntax', fixes: ['frame.setLayout(new FlowLayout());', 'frame.setLayout(FlowLayout);', 'frame.layout = new FlowLayout();'], why: 'Creating an object needs brackets.' },
            { line: 12, kind: 'syntax', fixes: ['frame.add(method);', 'frame.add(method):', 'frame.add(method).'], why: 'A missing `;`.' },
            { line: 16, kind: 'semantic', fixes: ['frame.setVisible(true);', 'frame.setVisible();', 'frame.show = true;'], why: 'It compiles and runs, but no window ever appears.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Build a registration window',
          body: 'Build a window titled `Course Registration` holding: a `JLabel` saying `Course code:`, a `JTextField`, a `JComboBox` with grades `A`, `B`, `C`, a `JButton` saying `Register`, and a `JTextArea` inside a `JScrollPane`.\n\nPress **▶ Run** to see it, then **Check my code**.',
          swing: true,
          starter: `import javax.swing.*;
import java.awt.*;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Change me");
        frame.setLayout(new FlowLayout());

        // create and add your components here

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(340, 260);
        frame.setVisible(true);
    }
}
`,
          tests: [
            { label: 'The window title is right', src: 'new\\s+JFrame\\s*\\(\\s*"Course Registration"\\s*\\)', fail: 'Title it `new JFrame("Course Registration")`.' },
            { label: 'A label says `Course code:`', src: 'new\\s+JLabel\\s*\\(\\s*"Course code:"\\s*\\)', fail: 'Add `new JLabel("Course code:")`.' },
            { label: 'Has a text field', src: 'new\\s+JTextField\\s*\\(', fail: 'Add a `JTextField`.' },
            { label: 'Has a drop-down of grades', src: 'new\\s+JComboBox', fail: 'Add a `JComboBox`.' },
            { label: 'Has a `Register` button', src: 'new\\s+JButton\\s*\\(\\s*"Register"\\s*\\)', fail: 'Add `new JButton("Register")`.' },
            { label: 'The text area scrolls', src: 'new\\s+JScrollPane\\s*\\(', fail: 'Wrap the area: `frame.add(new JScrollPane(area));`.' },
            { label: 'Every part is added', src: '\\.add\\s*\\(', min: 5, fail: 'Each component needs its own `frame.add(...)`.' },
          ],
          hints: ['Grades: `new JComboBox<>(new String[] {"A", "B", "C"})`.', '`new JTextArea(5, 25)` is 5 rows by 25 columns.'],
          solution: {
            code: `import javax.swing.*;
import java.awt.*;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Course Registration");
        frame.setLayout(new FlowLayout());

        JTextField code = new JTextField(10);
        JComboBox<String> grade = new JComboBox<>(new String[] {"A", "B", "C"});
        JButton register = new JButton("Register");
        JTextArea output = new JTextArea(5, 25);

        frame.add(new JLabel("Course code:"));
        frame.add(code);
        frame.add(grade);
        frame.add(register);
        frame.add(new JScrollPane(output));

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(340, 260);
        frame.setVisible(true);
    }
}
`,
            steps: [
              { lines: [9, 12], text: '**Keep references** to components you’ll need later, like reading the text field.' },
              { lines: [14, 14], text: '**A fixed label** can be created right inside `add`.' },
              { lines: [18, 18], text: '**Add the scroll pane**, not the area itself: the pane holds the area.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Windows: done.',
          body: 'It looks right. Next, it needs to do something. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
