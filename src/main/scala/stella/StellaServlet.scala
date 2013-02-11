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
    // Rewrite this to take the start, stop, step parameters and pass
    // them to the Scala version of the random number generator?
    MetricData.generate(params("start").toDouble, params("stop").toDouble,
      params("step").toDouble)
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

  def generate(start: Double, stop: Double, step: Double) = {
    var last: Double = start 
    var value: Double = 0.0
    var values: List[Double] = List()
    var i: Int = 0

    while (last < stop) {
      last += step
      i += 2
      value = Math.max(-10.0,
        Math.min(10.0, value + 0.8 * Math.random - 0.4 + 0.2 * Math.cos(i)))
      value :: values
    }
    
    values.slice(((start - stop) / step).toInt, values.length).map { v: Double =>
      Metric(v.toString(), DateTime.now.toString())
    }
  }

}

