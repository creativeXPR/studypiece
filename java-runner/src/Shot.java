import java.awt.Color;
import java.awt.Dialog;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Frame;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.Window;
import java.awt.image.BufferedImage;
import java.io.File;
import java.lang.reflect.InvocationTargetException;
import javax.imageio.ImageIO;
import javax.swing.RootPaneContainer;

/**
 * Runs a learner's Swing program on the virtual display, then saves a picture of each
 * window it opened (shot0.png, shot1.png, …) with a drawn title bar, since a bare
 * virtual display has no window decorations. Dialogs from JOptionPane come out too:
 * a modal dialog blocks main, so we take the pictures after a short wait either way.
 *
 *   Shot <runDir> <mainClass>
 */
public class Shot {
  static final int BAR = 30;

  public static void main(String[] args) throws Exception {
    File dir = new File(args[0]);
    Thread app = new Thread(() -> {
      try {
        Class.forName(args[1]).getMethod("main", String[].class).invoke(null, (Object) new String[0]);
      } catch (InvocationTargetException e) {
        System.err.print("Exception in thread \"main\" ");
        e.getCause().printStackTrace();
      } catch (Throwable e) {
        e.printStackTrace();
      }
    }, "main");
    app.start();
    app.join(4000);
    Thread.sleep(500);
    ImageIO.setUseCache(false);
    EventQueue.invokeAndWait(() -> {
      int n = 0;
      for (Window w : Window.getWindows()) {
        if (!w.isShowing() || w.getWidth() < 1 || n > 5) continue;
        try {
          ImageIO.write(picture(w), "png", new File(dir, "shot" + n++ + ".png"));
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    });
    System.out.flush();
    System.err.flush();
    Runtime.getRuntime().halt(0);
  }

  static BufferedImage picture(Window w) {
    java.awt.Component body = w instanceof RootPaneContainer r ? r.getRootPane() : w;
    int width = Math.max(body.getWidth(), 120);
    int height = body.getHeight();
    // Drawn at 2x so the picture stays sharp on phone screens.
    BufferedImage img = new BufferedImage(width * 2, (height + BAR) * 2, BufferedImage.TYPE_INT_RGB);
    Graphics2D g = img.createGraphics();
    g.scale(2, 2);
    g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
    g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
    g.setColor(new Color(0xE9EBF0));
    g.fillRect(0, 0, width, BAR);
    g.setColor(new Color(0xD0D3DA));
    g.drawLine(0, BAR - 1, width, BAR - 1);
    int[] dots = { 0xFF5F57, 0xFEBC2E, 0x28C840 };
    for (int k = 0; k < 3; k++) {
      g.setColor(new Color(dots[k]));
      g.fillOval(12 + k * 18, BAR / 2 - 6, 12, 12);
    }
    String title = w instanceof Frame f ? f.getTitle() : w instanceof Dialog d ? d.getTitle() : "";
    g.setColor(new Color(0x30333A));
    g.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 13));
    int tw = g.getFontMetrics().stringWidth(title == null ? "" : title);
    g.drawString(title == null ? "" : title, Math.max(70, (width - tw) / 2), BAR / 2 + 5);
    g.translate(0, BAR);
    body.paint(g);
    g.dispose();
    return img;
  }
}
