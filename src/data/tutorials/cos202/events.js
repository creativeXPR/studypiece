// COS 202 · Swing GUI and events · Lesson 2: events and listeners.

export default {
  id: 'events',
  title: 'Events and listeners',
  covers: 'Event-driven programming, ActionListener, anonymous classes and lambdas, getText and setText, getSelectedItem, validation, JOptionPane',
  minutes: 15,
  sections: [
    {
      name: 'Making it respond',
      terms: [
        ['Event-driven', 'The program waits, and code runs in response to events like clicks, not in a fixed order.'],
        ['Source, event, listener', 'The source (a button) creates an event object (`ActionEvent`) and passes it to its registered listeners.'],
        ['ActionListener', 'An interface with one method, `actionPerformed(ActionEvent e)`. Register it with `addActionListener`.'],
        ['Propagation', 'An unhandled exception in a listener stops that event’s handling, while the window stays open. Catch what you expect.'],
        ['JOptionPane', '`JOptionPane.showMessageDialog(frame, "text", "Title", JOptionPane.ERROR_MESSAGE)` shows a pop-up.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Swing GUI and events · Lesson 2',
          title: 'Don’t call us, we’ll call you',
          body: 'In ==event-driven== code you don’t run the click code yourself. You register it, and Swing calls it:\n\n`button.addActionListener(new ActionListener() {`\n\n`    public void actionPerformed(ActionEvent e) {`\n\n`        label.setText("Clicked");`\n\n`    }`\n\n`});`\n\n`ActionListener` has one method, so it is a functional interface. The same thing as a lambda:\n\n`button.addActionListener(e -> label.setText("Clicked"));`',
          cta: 'Order a click',
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'What happens when a user clicks the button?',
          items: [
            'You registered a listener with `addActionListener`',
            'The user clicks the button',
            'Swing creates an `ActionEvent`',
            'Swing calls `actionPerformed(e)` on the listener',
            'Your code reads the fields and updates the window',
          ],
          explain: 'The listener runs on the Event Dispatch Thread, so keep it quick.',
        },
        {
          type: 'fill',
          eyebrow: 'Build it',
          title: 'Read, convert, show',
          body: 'Every text field gives you a `String`. Convert it before calculating.',
          code: `import javax.swing.*;

class Doubler {
    JTextField input = new JTextField(5);
    JLabel output = new JLabel();
    JButton go = new JButton("Double");

    void wire() {
        go.[[addActionListener]](e -> {
            String text = input.[[getText]]().trim();
            int n = Integer.[[parseInt]](text);
            output.[[setText]]("" + n * 2);
        });
    }
}`,
          bank: ['addListener', 'setValue', 'toInt', 'getValue'],
          explain: '`getText` reads; `setText` writes. `"" + n * 2` builds the text, because `setText` needs a `String`.',
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'The Register button',
          body: 'A credit unit must be a positive whole number.',
          code: `import javax.swing.*;
import java.awt.event.*;

class Register implements ActionListener {
    JTextField unitField = new JTextField(5);
    JLabel output = new JLabel();

    public void actionPerformed(ActionEvent e) {
        String text = unitField.getText.trim();
        try {
            int unit = Integer.parse(text);
            if (unit < 0) {
                output.setText("Unit must be positive");
                return;
            }
            output.setText("Saved " + unit);
        } catch (NumberFormatException ex) {
            output.setText("Enter a whole number");
        }
    }
}`,
          errors: [
            { line: 9, kind: 'syntax', fixes: ['String text = unitField.getText().trim();', 'String text = unitField.text.trim();', 'String text = trim(unitField.getText);'], why: '`getText` is a method, so it needs brackets.' },
            { line: 11, kind: 'syntax', fixes: ['int unit = Integer.parseInt(text);', 'int unit = Integer.toInt(text);', 'int unit = (int) text;'], why: 'The method is called `parseInt`.' },
            { line: 12, kind: 'semantic', fixes: ['if (unit <= 0) {', 'if (unit > 0) {', 'if (unit == 0) {'], why: 'It compiles, but `0` slips through, and it isn’t positive.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'The wrong payment',
          body: 'Choosing `Cash` should make a cash payment. Empty input should be refused.',
          code: `import javax.swing.*;

abstract class PaymentMethod { }
class CardPayment extends PaymentMethod { }
class CashPayment extends PaymentMethod { }

class Pay {
    JTextField amount = new JTextField(8);
    JComboBox<String> box = new JComboBox<>(new String[] {"Card", "Cash"});

    PaymentMethod choose() {
        if (amount.getText().trim().isEmpty) {
            return null;
        }
        CardPayment payment;
        if ("Cash".equals(box.getSelectedItem())) {
            payment = new CardPayment();
        } else {
            payment = new CardPayment();
        }
        return payment;
    }
}`,
          errors: [
            { line: 12, kind: 'syntax', fixes: ['if (amount.getText().trim().isEmpty()) {', 'if (amount.getText().trim().empty) {', 'if (amount.getText().trim() == 0) {'], why: '`isEmpty` is a method, so it needs brackets.' },
            { line: 15, kind: 'syntax', fixes: ['PaymentMethod payment;', 'CashPayment payment;', 'Object payment;'], why: 'Once fixed below, the variable must hold either kind, so its type must be the parent. A `CardPayment` variable can’t hold a `CashPayment`.' },
            { line: 17, kind: 'semantic', fixes: ['payment = new CashPayment();', 'payment = new PaymentMethod();', 'payment = null;'], why: 'Choosing `Cash` builds a card payment: it compiles, but it does the wrong thing.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Wire up a button',
          body: 'Write `wire(button, input, output)` so that clicking `button` reads a number from `input` and shows its square in `output`.\n\nIf the input is empty or not a whole number, show `Enter a number` instead. Your code is tested by really clicking the button.',
          starter: `import javax.swing.*;
import java.awt.*;

public class Main {
    static void wire(JButton button, JTextField input, JLabel output) {
        // your code here
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Squares");
        frame.setLayout(new FlowLayout());
        JTextField input = new JTextField(6);
        JButton button = new JButton("Square");
        JLabel output = new JLabel("Answer here");
        wire(button, input, output);
        frame.add(input);
        frame.add(button);
        frame.add(output);
        frame.setSize(320, 110);
        frame.setVisible(true);
    }
}
`,
          tests: [
            { label: 'Clicking shows the square', body: 'JButton b = new JButton(); JTextField i = new JTextField("7"); JLabel o = new JLabel(); Main.wire(b, i, o); b.doClick(); return o.getText();', expect: '49' },
            { label: 'Extra spaces are fine', body: 'JButton b = new JButton(); JTextField i = new JTextField("  3 "); JLabel o = new JLabel(); Main.wire(b, i, o); b.doClick(); return o.getText();', expect: '9' },
            { label: 'Text gets a friendly message', body: 'JButton b = new JButton(); JTextField i = new JTextField("abc"); JLabel o = new JLabel(); Main.wire(b, i, o); b.doClick(); return o.getText();', expect: 'Enter a number' },
            { body: 'JButton b = new JButton(); JTextField i = new JTextField(""); JLabel o = new JLabel(); Main.wire(b, i, o); b.doClick(); return o.getText();', expect: 'Enter a number', hidden: true },
            { body: 'JButton b = new JButton(); JTextField i = new JTextField("2"); JLabel o = new JLabel(); Main.wire(b, i, o); b.doClick(); i.setText("5"); b.doClick(); return o.getText();', expect: '25', hidden: true },
          ],
          hints: ['`button.addActionListener(e -> { … });`', 'Put `Integer.parseInt(input.getText().trim())` in a `try`, and catch `NumberFormatException`.'],
          solution: {
            code: `import javax.swing.*;
import java.awt.*;

public class Main {
    static void wire(JButton button, JTextField input, JLabel output) {
        button.addActionListener(e -> {
            try {
                int n = Integer.parseInt(input.getText().trim());
                output.setText("" + n * n);
            } catch (NumberFormatException ex) {
                output.setText("Enter a number");
            }
        });
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Squares");
        frame.setLayout(new FlowLayout());
        JTextField input = new JTextField(6);
        JButton button = new JButton("Square");
        JLabel output = new JLabel("Answer here");
        wire(button, input, output);
        frame.add(input);
        frame.add(button);
        frame.add(output);
        frame.setSize(320, 110);
        frame.setVisible(true);
    }
}
`,
            steps: [
              { lines: [6, 6], text: '**Register, don’t run:** this code runs later, on each click.' },
              { lines: [8, 8], text: '**Read fresh on every click**, and `trim()` stray spaces.' },
              { lines: [10, 12], text: '**Catch the expected failure.** An empty string is a `NumberFormatException` too.' },
            ],
            note: 'In a real window, a `JOptionPane.showMessageDialog` is the usual way to report the error.',
          },
        },
        {
          type: 'finish',
          title: 'Events: done.',
          body: 'Your windows now respond to people. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
