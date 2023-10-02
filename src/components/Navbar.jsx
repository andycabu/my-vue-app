import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import IconSeparation from "./IconSeparation";
import ItemsNavbar from "./ItemsNavbar";
import { useEffect, useState } from "react";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { useApp } from "../context/AppContext";

const navbar = [
  {
    id: 1,
    name: "Home",
    href: "/",

    icon: <IconSeparation />,
  },

  {
    id: 2,
    name: "Tareas",
    href: "/tasks",

    icon: <IconSeparation />,
  },
  {
    id: 3,
    name: "Productos",
    href: "/products",
  },
];

function Navbar() {
  const router = useNavigate();
  const [open, setOpen] = useState(false);

  const { isAuthenticated, logout } = useApp();

  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth > 1024) {
      setOpen(false);
    }
  }, [screenWidth]);

  function openMenu() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }
  return (
    <>
      <nav className=" p-8 flex justify-between items-center bg-[var(--card-background-color)] box-shadow-1">
        <Link to="/" className="text-3xl font-bold leading-none">
          <svg
            className="h-10"
            viewBox="0 0 251.941 251.941"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="_1" data-name="1">
                <g id="bad_tooth" data-name="bad tooth">
                  <path
                    d="m236.832 31.658-19.6 32.3-35.832 2.186-40 30.1 23.8-50.12 35.557-5.787 16.478-28.86a63.091 63.091 0 0 0 -33.921-9.751c-18.566 0-30.755 2.733-57.34 15.945-14.194-8.096-33.966-15.945-57.347-15.945-29.58 0-66.9 20.38-66.9 86.015 0 70.413 43.583 162.475 66.9 162.475s11.85-109.911 57.344-109.911 34.029 109.911 57.343 109.911 66.9-92.062 66.9-162.475c.002-24.628-5.253-42.885-13.382-56.083z"
                    fill="#ff1089"
                  />
                  <path
                    d="m183.314 251.941c-11.156 0-14.784-18.9-19.38-42.833-5.738-29.882-12.878-67.074-37.963-67.074s-32.226 37.192-37.964 67.074c-4.595 23.932-8.224 42.833-19.38 42.833-25.461 0-68.627-93.325-68.627-164.2 0-64.761 36.97-87.741 68.627-87.741 23.311 0 43.114 7.705 57.4 15.716 27.36-13.522 39.373-15.716 57.287-15.716a64.679 64.679 0 0 1 34.851 10.024 1.724 1.724 0 0 1 .614 2.224c-.024.047-.024.047-16.524 28.944a1.713 1.713 0 0 1 -1.221.847l-34.664 5.642-20.4 42.968 34.393-25.884a1.728 1.728 0 0 1 .934-.344l34.928-2.137 19.13-31.522a1.728 1.728 0 0 1 1.47-.829 1.73 1.73 0 0 1 1.47.818c9.05 14.695 13.639 33.869 13.639 56.99.007 70.875-43.159 164.2-68.62 164.2zm-57.343-113.358c27.937 0 35.377 38.742 41.352 69.874 3.954 20.586 7.687 40.033 15.991 40.033 21 0 65.176-90.055 65.176-160.749 0-21.193-3.928-38.908-11.682-52.719l-18.1 29.828a1.725 1.725 0 0 1 -1.37.825l-35.312 2.16-39.583 29.791a1.725 1.725 0 0 1 -2.6-2.12l23.797-50.124a1.72 1.72 0 0 1 1.282-.96l34.745-5.656 15.244-26.7a61.4 61.4 0 0 0 -31.6-8.615c-16.9 0-28.407 2.036-53.7 14.348a135.228 135.228 0 0 1 12.492 8.493 1.725 1.725 0 1 1 -2.1 2.737 132.541 132.541 0 0 0 -14.759-9.791 1.56 1.56 0 0 1 -.264-.148c-13.928-7.917-33.404-15.639-56.353-15.639-31.507 0-65.176 22.149-65.176 84.29 0 70.694 44.181 160.749 65.176 160.749 8.305 0 12.037-19.447 15.991-40.033 5.976-31.132 13.416-69.874 41.353-69.874z"
                    fill="#ff1089"
                  />
                  <g fill="#fff">
                    <path d="m46.2 186.7a3.45 3.45 0 0 1 -3.11-1.951 206.591 206.591 0 0 1 -10.956-30.219 3.451 3.451 0 1 1 6.636-1.9 202.633 202.633 0 0 0 10.538 29.12 3.453 3.453 0 0 1 -3.108 4.95z" />
                    <path d="m30.328 135.411a3.453 3.453 0 0 1 -3.389-2.814c-3.975-21.135-4.793-41.4-2.43-60.229 5.356-42.675 31.855-46.268 32.981-46.402a3.45 3.45 0 0 1 .827 6.851c-.965.132-22.318 3.438-26.959 40.414-2.274 18.116-1.478 37.661 2.366 58.092a3.451 3.451 0 0 1 -2.754 4.028 3.52 3.52 0 0 1 -.642.06z" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </Link>
        <div className="lg:hidden">
          <button
            onClick={openMenu}
            className="navbar-burger flex items-center text-blue-600 p-3"
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden text-[var(--text-color)] absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <ItemsNavbar navbar={navbar} />
        </ul>
        <div className="hidden lg:flex gap-4 ">
          {isAuthenticated ? (
            <Button
              text="Cerrar sesion"
              bg="lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200 "
              type="button"
              onClick={() => logout()}
            />
          ) : (
            <>
              <Button
                text="Iniciar sesion"
                bg="lg:inline-block py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-[var(--text-color)] font-bold rounded-xl transition duration-200 "
                type="button"
                onClick={() => router("/login")}
              />
              <Button
                text="Registrarse"
                bg="lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200 "
                type="button"
                onClick={() => router("/register")}
              />
            </>
          )}
        </div>
      </nav>
      <div
        className={`navbar-menu relative z-50 ${
          open && screenWidth <= 1024 ? "flex" : "hidden"
        }`}
      >
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <svg className="h-12" alt="logo" viewBox="0 0 10240 10240">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M8284 9162 c-2 -207 -55 -427 -161 -667 -147 -333 -404 -644 -733 -886 -81 -59 -247 -169 -256 -169 -3 0 -18 -9 -34 -20 -26 -19 -344 -180 -354 -180 -3 0 -29 -11 -58 -24 -227 -101 -642 -225 -973 -290 -125 -25 -397 -70 -480 -80 -22 -3 -76 -9 -120 -15 -100 -13 -142 -17 -357 -36 -29 -2 -98 -7 -153 -10 -267 -15 -436 -28 -525 -40 -14 -2 -45 -7 -70 -10 -59 -8 -99 -14 -130 -20 -14 -3 -41 -7 -60 -11 -19 -3 -39 -7 -45 -8 -5 -2 -28 -6 -50 -10 -234 -45 -617 -165 -822 -257 -23 -10 -45 -19 -48 -19 -7 0 -284 -138 -340 -170 -631 -355 -1107 -842 -1402 -1432 -159 -320 -251 -633 -308 -1056 -26 -190 -27 -635 -1 -832 3 -19 7 -59 10 -89 4 -30 11 -84 17 -120 6 -36 12 -77 14 -91 7 -43 33 -174 39 -190 3 -8 7 -28 9 -45 6 -35 52 -221 72 -285 7 -25 23 -79 35 -120 29 -99 118 -283 189 -389 67 -103 203 -244 286 -298 75 -49 178 -103 196 -103 16 0 27 16 77 110 124 231 304 529 485 800 82 124 153 227 157 230 3 3 28 36 54 74 116 167 384 497 546 671 148 160 448 450 560 542 14 12 54 45 90 75 88 73 219 172 313 238 42 29 77 57 77 62 0 5 -13 34 -29 66 -69 137 -149 405 -181 602 -7 41 -14 82 -15 90 -1 8 -6 46 -10 83 -3 37 -8 77 -10 88 -2 11 -7 65 -11 122 -3 56 -8 104 -9 107 -2 3 0 12 5 19 6 10 10 8 15 -10 10 -34 167 -346 228 -454 118 -210 319 -515 340 -515 4 0 40 18 80 40 230 128 521 255 787 343 118 40 336 102 395 113 28 5 53 11 105 23 25 5 59 12 75 15 17 3 41 8 55 11 34 7 274 43 335 50 152 18 372 29 565 29 194 0 481 -11 489 -19 2 -3 -3 -6 -12 -6 -9 -1 -20 -2 -24 -3 -33 -8 -73 -16 -98 -21 -61 -10 -264 -56 -390 -90 -649 -170 -1243 -437 -1770 -794 -60 -41 -121 -82 -134 -93 l-24 -18 124 -59 c109 -52 282 -116 404 -149 92 -26 192 -51 220 -55 17 -3 64 -12 105 -21 71 -14 151 -28 230 -41 19 -3 46 -7 60 -10 14 -2 45 -7 70 -10 25 -4 56 -8 70 -10 14 -2 53 -7 88 -10 35 -4 71 -8 81 -10 10 -2 51 -6 92 -9 101 -9 141 -14 147 -21 3 -3 -15 -5 -39 -6 -24 0 -52 -2 -62 -4 -21 -4 -139 -12 -307 -22 -242 -14 -700 -7 -880 13 -41 4 -187 27 -250 39 -125 23 -274 68 -373 111 -43 19 -81 34 -86 34 -4 0 -16 -8 -27 -17 -10 -10 -37 -33 -59 -52 -166 -141 -422 -395 -592 -586 -228 -257 -536 -672 -688 -925 -21 -36 -43 -66 -47 -68 -4 -2 -8 -7 -8 -11 0 -5 -24 -48 -54 -97 -156 -261 -493 -915 -480 -935 2 -3 47 -21 101 -38 54 -18 107 -36 118 -41 58 -25 458 -138 640 -181 118 -27 126 -29 155 -35 14 -2 45 -9 70 -14 66 -15 137 -28 300 -55 37 -7 248 -33 305 -39 28 -3 84 -9 125 -13 163 -16 792 -8 913 12 12 2 58 9 102 15 248 35 423 76 665 157 58 19 134 46 170 60 86 33 344 156 348 166 2 4 8 7 13 7 14 0 205 116 303 184 180 126 287 216 466 396 282 281 511 593 775 1055 43 75 178 347 225 455 100 227 236 602 286 790 59 220 95 364 120 485 6 28 45 245 50 275 2 14 7 41 10 60 3 19 8 49 10 65 2 17 6 46 9 65 15 100 35 262 40 335 3 39 8 89 10 112 22 225 33 803 21 1043 -3 41 -7 129 -11 195 -3 66 -8 136 -10 155 -2 19 -6 76 -10 125 -3 50 -8 101 -10 115 -2 14 -6 57 -10 95 -7 72 -12 113 -20 175 -2 19 -7 55 -10 80 -6 46 -43 295 -51 340 -2 14 -9 54 -15 90 -5 36 -16 97 -24 135 -8 39 -17 84 -20 100 -12 68 -18 97 -50 248 -19 87 -47 204 -61 260 -14 56 -27 109 -29 117 -30 147 -232 810 -253 832 -4 4 -7 -23 -8 -60z"
                ></path>
              </svg>
            </a>
            <button onClick={openMenu} className="navbar-close">
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul className="text-[var(--text-color)]">
              <ItemsNavbar
                navbar={navbar}
                classLink=" block p-4  font-semibold  hover:bg-blue-50 hover:text-blue-600 rounded"
                classLi="mb-1"
              />
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <a
                className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                href="#"
              >
                Sign in
              </a>
              <a
                className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                href="#"
              >
                Sign Up
              </a>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2021</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
