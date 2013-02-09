package stella

import org.scalatra._
import scalate.ScalateSupport

class StellaServlet extends StellaByStarlightStack with ScalateSupport {

  get("/") {
    contentType = "text/html"
    ssp("index")
  }
  
}
