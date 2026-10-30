// COS 202 · Swing GUI and events · Lesson 3: threads basics.

export default {
  id: 'threads',
  title: 'Threads basics',
  covers: 'Thread and Runnable, start vs run, join, race conditions and synchronized, keeping a GUI responsive',
  minutes: 11,
  sections: [
    {
      name: 'Doing two things at once',
      terms: [
        ['Thread', 'A separate path of execution. Create one by passing a `Runnable`, or by extending `Thread`.'],
        ['start vs run', '`start()` begins a new thread. Calling `run()` directly just runs it on the current thread.'],
        ['join', '`t.join()` waits until thread `t` has finished.'],
        ['Race condition', 'Threads change shared data at once and updates get lost. `synchronized` lets one thread in at a time.'],
        ['Event Dispatch Thread', 'The thread that runs all Swing events. Slow work there freezes the window, so run it on another thread.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Swing GUI and events · Lesson 3',
          title: 'A second path through the code',
          body: '`Runnable job = () -> System.out.println("Working");`\n\n`Thread t = new Thread(job);`\n\n`t.start();`\n\n`t.join();`\n\nA ==thread== runs alongside `main`. Their order isn’t guaranteed, unless you make one wait with `join()`.\n\nThe trap: `t.run()` **doesn’t** create a thread. It’s an ordinary method call.',
          cta: 'Prove it',
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'start or run?',
          code: `public static void main(String[] args) throws Exception {
    Runnable job = () -> System.out.println(Thread.currentThread().getName());
    Thread a = new Thread(job, "worker");
    a.run();
    a.start();
    a.join();
    System.out.println("done");
}`,
          options: [
            { out: 'main\nworker\ndone', correct: true, why: '`run()` is an ordinary call, on `main`. `start()` makes the real thread, and `join()` waits for it before `done`.' },
            { out: 'worker\nworker\ndone', why: '`a.run()` executes on the thread that called it: `main`.' },
            { out: 'worker\ndone', why: 'Both `run()` and `start()` execute the job.' },
            { out: 'main\ndone\nworker', why: '`join()` makes `main` wait for the worker first.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Good idea or bad idea in a Swing program?',
          buckets: [
            { id: 'good', label: 'Good' },
            { id: 'bad', label: 'Freezes or breaks it' },
          ],
          items: [
            { text: 'A 10-second download inside `actionPerformed`', bucket: 'bad', why: 'That blocks the Event Dispatch Thread, so the window **freezes**.' },
            { text: 'Doing slow work on a new `Thread`', bucket: 'good', why: 'The window stays responsive.' },
            { text: 'Updating a label with `SwingUtilities.invokeLater`', bucket: 'good', why: 'Swing components should be touched on the Event Dispatch Thread.' },
            { text: '`Thread.sleep(5000)` in a button’s listener', bucket: 'bad', why: 'The whole window sleeps too.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Lost updates',
          body: 'Two threads each add 1000 to the counter, and it should end at 2000.',
          code: `class Counter {
    private int count;

    public void add() {
        count++;
    }

    public int get() { return count; }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Counter c = new Counter();
        Runnable job = () -> {
            for (int i = 0; i < 1000; i++) c.add();
        };
        Thread a = new Thread(job);
        Thread b = new Thread(job);
        a.run();
        b.start();
        a.join();
        System.out.println(c.get());
    }
}`,
          errors: [
            { line: 4, kind: 'semantic', fixes: ['public synchronized void add() {', 'public static void add() {', 'public final void add() {'], why: '`count++` is really three steps: read, add, write. Two threads can interleave them and lose updates. `synchronized` lets one in at a time.' },
            { line: 19, kind: 'semantic', fixes: ['a.start();', 'a.begin();', 'a.join();'], why: '`run()` executes on `main`, so no second thread is started.' },
            { line: 21, kind: 'semantic', fixes: ['a.join(); b.join();', 'a.wait();', 'Thread.sleep(0);'], why: 'Without waiting for **both** threads, the count may print before they finish.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Count with two threads',
          body: 'Write `SafeCounter` with a `synchronized` method `add()` and a method `get()`.\n\nWrite `Main.countWith(threads, each)`: it starts `threads` threads, each calling `add()` `each` times, **waits for them all**, and returns the final count.',
          starter: `// your SafeCounter class here

public class Main {
    static int countWith(int threads, int each) throws InterruptedException {
        // your code here
        return 0;
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println(countWith(4, 5000));
    }
}
`,
          tests: [
            { label: '`add` is synchronized', check: 'Modifier.isSynchronized(SafeCounter.class.getDeclaredMethod("add").getModifiers())' },
            { label: 'One thread counts correctly', expr: 'Main.countWith(1, 100)', expect: 100 },
            { label: 'Four threads lose nothing', expr: 'Main.countWith(4, 5000)', expect: 20000 },
            { label: 'Starts real threads', src: '\\.start\\s*\\(', fail: 'Call `start()`: `run()` would not create a thread.' },
            { label: 'Waits with `join`', src: '\\.join\\s*\\(', fail: 'Call `join()` on each thread before reading the count.' },
            { expr: 'Main.countWith(8, 2000)', expect: 16000, hidden: true },
          ],
          hints: ['Keep the threads in an array so you can `join` them all after starting them all.', 'Starting and joining in the same loop would run them one at a time.'],
          solution: {
            code: `class SafeCounter {
    private int count;

    public synchronized void add() {
        count++;
    }

    public synchronized int get() {
        return count;
    }
}

public class Main {
    static int countWith(int threads, int each) throws InterruptedException {
        SafeCounter c = new SafeCounter();
        Thread[] all = new Thread[threads];
        for (int i = 0; i < threads; i++) {
            all[i] = new Thread(() -> {
                for (int k = 0; k < each; k++) c.add();
            });
            all[i].start();
        }
        for (Thread t : all) t.join();
        return c.get();
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println(countWith(4, 5000));
    }
}
`,
            steps: [
              { lines: [4, 6], text: '**`synchronized`:** one thread at a time, so no update is lost.' },
              { lines: [17, 22], text: '**Start them all first**, so they really run together.' },
              { lines: [23, 23], text: '**Then wait for each one**, before reading the result.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Threads: done.',
          body: 'You can start threads, wait for them and keep shared data safe. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
