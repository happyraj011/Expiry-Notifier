import React from 'react';
import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import Link from 'next/link';

export default function FooterCom() {
  return (
    <Footer container className="bg-gray-900 text-white">
      <div className="w-full max-w-7xl mx-auto px-8 py-8">
        {/* Main Footer Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
          {/* Branding Section */}
          <div>
            <Link
              href="/"
              className="self-center text-3xl font-bold text-gray-100 whitespace-nowrap"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white text-4xl">
                Expiry
              </span>
              <span className="ml-3 text-3xl">Notifier</span>
            </Link>
          </div>

          {/* Links Section */}
          <div>
            <Footer.Title title="About" className="text-gray-300 text-lg" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="/about"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gray-400 text-sm"
              >
                Expiry Notifier
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Follow Us */}
          <div>
            <Footer.Title title="Follow us" className="text-gray-300 text-lg" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://www.github.com/happyraj011"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gray-400 text-sm"
              >
                Github
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:underline text-gray-400 text-sm"
              >
                Discord
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Legal */}
          <div>
            <Footer.Title title="Legal" className="text-gray-300 text-lg" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="#"
                className="hover:underline text-gray-400 text-sm"
              >
                Privacy Policy
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:underline text-gray-400 text-sm"
              >
                Terms &amp; Conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider className="my-6 border-gray-700" />

        {/* Footer Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <Footer.Copyright
            href="#"
            by="Expiry Notifier"
            year={new Date().getFullYear()}
            className="text-gray-400 text-sm"
          />
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Footer.Icon
              href="https://facebook.com"
              icon={BsFacebook}
              className="hover:text-gray-300 text-2xl"
              aria-label="Facebook"
            />
            <Footer.Icon
              href="https://instagram.com"
              icon={BsInstagram}
              className="hover:text-gray-300 text-2xl"
              aria-label="Instagram"
            />
            <Footer.Icon
              href="https://twitter.com"
              icon={BsTwitter}
              className="hover:text-gray-300 text-2xl"
              aria-label="Twitter"
            />
            <Footer.Icon
              href="https://github.com/happyraj011"
              icon={BsGithub}
              className="hover:text-gray-300 text-2xl"
              aria-label="Github"
            />
            <Footer.Icon
              href="https://dribbble.com"
              icon={BsDribbble}
              className="hover:text-gray-300 text-2xl"
              aria-label="Dribbble"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
