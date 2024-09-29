import Link from "next/link";
import { logout } from "@/lib/auth";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NavigationEvents } from "./changenav";
import { Suspense } from "react";

export default async function Header() {
  const session = await getSession();
  const details = JSON.parse(JSON.stringify(session, null, 2));
  const sellerurl = session ? `dashboard/${details.user.id}` : "";

  return (
    <div className="p-5 mx-auto bg-white shadow-lg flex items-center space-x-4">
      <Link href={"/dashboard"}>
        <svg
          className="mx-auto h-10 w-auto"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="1000"
          zoomAndPan="magnify"
          viewBox="0 0 750 225"
          height="300"
          preserveAspectRatio="xMidYMid meet"
          version="1.0"
        >
          <defs>
            <g />
          </defs>
          <path
            strokeLinecap="butt"
            transform="matrix(2.119304, 0, 0, 2.119304, 54.239091, -24.642803)"
            fill="none"
            strokeLinejoin="miter"
            d="M 48.65025 91.999473 L 48.65025 76.975745 L 21.981336 76.975745 L 21.981336 30.374726 L 5.101529 30.374726 L 5.101529 91.999473 Z M 75.503481 45.997486 C 60.726739 45.997486 54.130012 52.81908 52.872966 62.877292 L 69.07264 62.877292 C 69.671672 60.259982 71.360022 58.569789 75.317321 58.569789 C 79.377837 58.569789 81.233916 60.095939 81.748162 63.804409 L 75.750467 64.73337 C 59.283532 67.267737 51.862906 72.069211 51.862906 81.777219 C 51.862906 88.20806 56.913208 93.256519 66.291288 93.256519 C 75.997453 93.256519 82.841165 88.537989 85.458475 80.354287 L 90.259949 91.999473 L 97.864893 91.999473 L 97.864893 67.597666 C 97.864893 53.418112 90.44611 45.997486 75.503481 45.997486 Z M 72.040154 80.933044 C 69.58873 80.933044 68.412783 79.757098 68.412783 78.232791 C 68.412783 75.449596 72.123097 73.678303 79.624823 72.419414 L 82.161033 71.988111 C 82.161033 76.726917 77.853531 80.933044 72.040154 80.933044 Z M 135.432507 45.997486 C 127.74462 45.997486 121.665825 50.470874 119.376601 60.506967 L 113.977938 47.254532 L 106.393269 47.254532 L 106.393269 91.999473 L 122.674043 91.999473 L 122.674043 69.721004 C 122.674043 63.373106 125.724499 60.342925 129.847684 60.342925 C 133.742315 60.342925 135.845379 62.444145 135.845379 68.360741 L 135.845379 91.999473 L 152.045053 91.999473 L 152.045053 65.990416 C 152.045053 53.005241 145.057572 45.997486 135.432507 45.997486 Z M 157.946903 70.565179 C 157.946903 84.147543 167.077997 93.256519 182.597539 93.256519 C 196.88031 93.256519 205.145111 85.837736 206.402157 73.759403 L 189.789612 73.759403 C 188.862494 77.736977 186.49217 79.593055 182.350553 79.593055 C 177.466137 79.593055 174.249795 76.376713 174.249795 69.638062 C 174.249795 62.877292 177.466137 59.662793 182.350553 59.662793 C 186.49217 59.662793 188.862494 61.517028 189.686394 65.494602 L 206.319215 65.494602 C 205.062168 53.418112 196.797367 45.997486 182.597539 45.997486 C 167.077997 45.997486 157.946903 55.108305 157.946903 68.710944 Z M 258.903184 66.751648 C 258.903184 54.859476 250.041193 45.997486 235.201783 45.997486 C 219.579023 45.997486 210.447929 55.108305 210.447929 68.710944 L 210.447929 70.565179 C 210.447929 84.147543 219.579023 93.256519 234.932679 93.256519 C 249.381336 93.256519 256.883063 85.59075 258.160384 76.80986 L 241.260303 76.80986 C 240.167299 79.159909 238.313064 80.684216 233.922619 80.684216 C 229.698059 80.684216 226.833764 78.582995 226.070689 72.998171 L 258.573255 72.998171 C 258.820241 70.895108 258.903184 69.287858 258.903184 66.751648 Z M 234.768637 58.055543 C 239.240182 58.055543 241.940435 60.012996 242.620567 64.81447 L 226.234732 64.81447 C 227.265067 59.930053 230.131206 58.055543 234.768637 58.055543 Z M 291.580852 45.997486 C 286.097403 45.997486 280.945726 49.871842 278.90533 60.940114 L 273.504824 47.254532 L 265.920155 47.254532 L 265.920155 91.999473 L 282.285715 91.999473 L 282.285715 74.19255 C 282.285715 66.34062 284.303993 63.557424 290.570791 63.557424 C 293.271044 63.557424 295.61925 63.804409 297.309443 63.970295 L 297.309443 46.843503 C 296.13534 46.491457 294.279262 45.997486 291.580852 45.997486 Z M 291.580852 45.997486 "
            stroke="#006032"
            strokeWidth="6.332085"
            strokeOpacity="1"
            strokeMiterlimit="4"
          />
          <g fill="#00bf63" fillOpacity="1">
            <g transform="translate(54.305319, 170.333147)">
              <g>
                <path d="M 103.054688 0 L 103.054688 -31.847656 L 46.515625 -31.847656 L 46.515625 -130.605469 L 10.734375 -130.605469 L 10.734375 0 Z M 103.054688 0 " />
              </g>
            </g>
          </g>
          <g fill="#00bf63" fillOpacity="1">
            <g transform="translate(159.130303, 170.333147)">
              <g>
                <path d="M 55.105469 -97.507812 C 23.796875 -97.507812 9.839844 -83.015625 7.15625 -61.722656 L 41.507812 -61.722656 C 42.761719 -67.269531 46.339844 -70.847656 54.746094 -70.847656 C 63.335938 -70.847656 67.269531 -67.628906 68.34375 -59.757812 L 55.640625 -57.789062 C 20.753906 -52.421875 5.007812 -42.222656 5.007812 -21.648438 C 5.007812 -8.050781 15.746094 2.683594 35.601562 2.683594 C 56.179688 2.683594 70.671875 -7.335938 76.214844 -24.691406 L 86.414062 0 L 102.515625 0 L 102.515625 -51.707031 C 102.515625 -81.761719 86.773438 -97.507812 55.105469 -97.507812 Z M 47.769531 -23.4375 C 42.582031 -23.4375 40.078125 -25.941406 40.078125 -29.164062 C 40.078125 -35.066406 47.949219 -38.824219 63.871094 -41.507812 L 69.238281 -42.402344 C 69.238281 -32.382812 60.113281 -23.4375 47.769531 -23.4375 Z M 47.769531 -23.4375 " />
              </g>
            </g>
          </g>
          <g fill="#00bf63" fillOpacity="1">
            <g transform="translate(269.321779, 170.333147)">
              <g>
                <path d="M 71.921875 -97.507812 C 55.640625 -97.507812 42.761719 -88.023438 37.929688 -66.734375 L 26.480469 -94.824219 L 10.375 -94.824219 L 10.375 0 L 44.90625 0 L 44.90625 -47.234375 C 44.90625 -60.652344 51.347656 -67.09375 60.113281 -67.09375 C 68.34375 -67.09375 72.816406 -62.617188 72.816406 -50.09375 L 72.816406 0 L 107.167969 0 L 107.167969 -55.105469 C 107.167969 -82.65625 92.320312 -97.507812 71.921875 -97.507812 Z M 71.921875 -97.507812 " />
              </g>
            </g>
          </g>
          <g fill="#00bf63" fillOpacity="1">
            <g transform="translate(384.521961, 170.333147)">
              <g>
                <path d="M 4.472656 -45.445312 C 4.472656 -16.640625 23.796875 2.683594 56.714844 2.683594 C 86.949219 2.683594 104.484375 -13.0625 107.167969 -38.644531 L 71.921875 -38.644531 C 69.953125 -30.234375 64.945312 -26.300781 56.179688 -26.300781 C 45.800781 -26.300781 39.003906 -33.097656 39.003906 -47.410156 C 39.003906 -61.722656 45.800781 -68.523438 56.179688 -68.523438 C 64.945312 -68.523438 69.953125 -64.585938 71.742188 -56.179688 L 106.988281 -56.179688 C 104.304688 -81.761719 86.773438 -97.507812 56.714844 -97.507812 C 23.796875 -97.507812 4.472656 -78.183594 4.472656 -49.378906 Z M 4.472656 -45.445312 " />
              </g>
            </g>
          </g>
          <g fill="#00bf63" fillOpacity="1">
            <g transform="translate(495.786703, 170.333147)">
              <g>
                <path d="M 107.167969 -53.496094 C 107.167969 -78.722656 88.382812 -97.507812 56.894531 -97.507812 C 23.796875 -97.507812 4.472656 -78.183594 4.472656 -49.378906 L 4.472656 -45.445312 C 4.472656 -16.640625 23.796875 2.683594 56.355469 2.683594 C 86.949219 2.683594 102.875 -13.597656 105.558594 -32.203125 L 69.777344 -32.203125 C 67.449219 -27.195312 63.511719 -23.972656 54.210938 -23.972656 C 45.265625 -23.972656 39.183594 -28.445312 37.570312 -40.253906 L 106.453125 -40.253906 C 106.988281 -44.726562 107.167969 -48.128906 107.167969 -53.496094 Z M 56 -71.921875 C 65.480469 -71.921875 71.207031 -67.808594 72.636719 -57.609375 L 37.929688 -57.609375 C 40.078125 -67.988281 46.160156 -71.921875 56 -71.921875 Z M 56 -71.921875 " />
              </g>
            </g>
          </g>
          <g fill="#00bf63" fillOpacity="1">
            <g transform="translate(607.409201, 170.333147)">
              <g>
                <path d="M 64.765625 -97.507812 C 53.136719 -97.507812 42.222656 -89.277344 37.929688 -65.839844 L 26.480469 -94.824219 L 10.375 -94.824219 L 10.375 0 L 45.085938 0 L 45.085938 -37.75 C 45.085938 -54.390625 49.378906 -60.292969 62.617188 -60.292969 C 68.34375 -60.292969 73.355469 -59.757812 76.933594 -59.398438 L 76.933594 -95.71875 C 74.425781 -96.433594 70.492188 -97.507812 64.765625 -97.507812 Z M 64.765625 -97.507812 " />
              </g>
            </g>
          </g>
        </svg>
      </Link>
      <Suspense fallback={null}>
      <div id="navlinks" className="flex space-x-4 justify-end grow">
          
        {session ? (
          <form
            action={async () => {
              "use server";
              await logout();
              redirect("/login");
            }}
          >
            
              <NavigationEvents url={sellerurl} userid={details.user.id} />
            
            <button type="submit" className="px-2 py-1 text-md">
              Logout
            </button>
          </form>
        ) : (
          <div>
          <Link href="/" className="px-4 py-1 text-md">
            Home
          </Link>
          <Link href="./login" className="px-4 py-1 text-md">
            Sign In
          </Link>
          </div>
        )}
        {session ? (
          <p></p>
        ) : (
          <Link
            href="./register"
            className="px-4 py-1 text-sm text-green-600 font-semibold rounded-full border green-purple-200 hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            {" "}
            Join{" "}
          </Link>
        )}
      </div>
      </Suspense>
    </div>
  );
}
