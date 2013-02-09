package stella

import org.scalatra._
import scalate.ScalateSupport

class StellaServlet extends StellaByStarlightStack {

  get("/") {
    <html>
      <body>
        <h1>Hello, world!</h1>
        Say <a href="hello-scalate">hey to Stella</a>.
      </body>
    </html>
  }
  
}
