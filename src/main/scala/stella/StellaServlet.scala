package stella

import org.scalatra._
import scalate.ScalateSupport

import com.github.nscala_time.time.Imports._
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._

class StellaServlet extends StellaByStarlightStack with JacksonJsonSupport {
  protected implicit val jsonFormats: Formats = DefaultFormats

  before() {
    contentType = formats("json")
  }

  get("/") {
    contentType = "text/html"
    ssp("index")
  }
  
  get("/api/metrics") {
    MetricData.generate
  }

}

case class Metric(value: String, timestamp: String)

object MetricData {

  var all = List(
    Metric("123", DateTime.now.toString()),
    Metric("456", DateTime.now.toString()),
    Metric("789", DateTime.now.toString()),
    Metric("456", DateTime.now.toString())
  )

  def generate = {
    1 to 1000 map { i => Metric(i.toString(), DateTime.now.toString()) }
  }

}

