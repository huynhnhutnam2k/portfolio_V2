/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Aos from "aos";
import { FormControl } from "@mui/material";
import {
  Mail,
  MessageSquare,
  Send,
  Share2,
  User,
  Github,
  Linkedin,
  ExternalLink,
  Facebook,
} from "lucide-react";
import { useMutationContact } from "../helpers/api/contact/useMutationContact";
import Swal from "sweetalert2";

const schema = z.object({
  name: z.string({ required_error: "Please enter your name" }),
  email: z.string({ required_error: "Please enter your email" }),
  message: z.string({ required_error: "Please enter your message" }),
});

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(schema),
  });

  const { control } = form;

  const { isPending } = useMutationContact();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  useEffect(() => {
    const initAOS = () => {
      Aos.init({
        once: false,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    if (isPending) {
      Swal.fire({
        title: "Sending Message...",
        html: "Please wait while we send your message",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }, [isPending]);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden mt-10 sm:mt-0"
      id="Contact"
    >
      <Header />

      <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%-65%] gap-12">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[#6366f1]/10">
          <FormContact control={control} onSubmit={onSubmit} />
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[#6366f1]/10">
          <ContactLinks />
        </div>
      </div>
    </div>
  );
};

export default Contact;

const Header = memo(() => {
  return (
    <div
      className="text-center pb-10"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
        <span
          style={{
            color: "#6366f1",
            backgroundImage: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Contact Me
        </span>
      </h2>
      <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
        Got a question? Send me a message, and I'll get back to you soon.
      </p>
    </div>
  );
});

type FormContact = {
  control: Control<
    {
      name: string;
      email: string;
      message: string;
    },
    unknown
  >;
  onSubmit: any;
  isSubmitting?: boolean;
};

const FormContact: React.FC<FormContact> = memo(
  ({ control, onSubmit, isSubmitting = false }) => {
    return (
      <div
        className="space-y-6 flex flex-col items-center"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="flex items-start">
          <div className="">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-3">
              Get in Touch
            </h2>

            <p className="text-gray-400">
              Have something to discuss? Send me a message and let's talk.
            </p>
          </div>
          <Share2 className="size-10 text-[#6366f1] opacity-50" />
        </div>

        <form
          action="https://formsubmit.co/ekizulfarrachman@gmail.com"
          method="POST"
          onSubmit={onSubmit}
          className="space-y-6"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  placeholder="Your name"
                  {...field}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                />
              </FormControl>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  placeholder="Your email"
                  {...field}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                />
              </FormControl>
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-[16px] w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  placeholder="Your Message"
                  {...field}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                />
              </FormControl>
            )}
          />

          <button
            data-aos="fade-up"
            data-aos-delay="400"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    );
  }
);

export const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/ekizr/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true,
  },
  {
    name: "Github",
    displayName: "Github",
    subText: "@huynhnhutnam2k",
    icon: Github,
    url: "http://github.com/huynhnhutnam2k",
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]",
  },
  {
    name: "Facebook",
    displayName: "Facebook",
    subText: "@nhut.nam.1217",
    icon: Facebook,
    url: "https://github.com/EkiZR",
    color: "#5d90fe",
    gradient: "from-[#bdd2ff] to-[#3667fb]",
  },
];

const ContactLinks = memo(() => {
  const linkedIn = socialLinks.find((link) => link.isPrimary);
  const otherLinks = socialLinks.filter((link) => !link.isPrimary);
  const [github, facebook] = otherLinks;
  const Icon = linkedIn?.icon;
  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Connect with me
      </h3>
      <div className="flex flex-col gap-4">
        <a
          href={linkedIn?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
        >
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${linkedIn?.gradient}`}
          ></div>
          <div className="relative flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-20 rounded-md transition-all duration-500
                   group-hover:scale-110 group-hover:opacity-30"
                style={{ backgroundColor: linkedIn?.color }}
              />
              <div className="relative p-2 rounded-md">
                {Icon && (
                  <Icon
                    className="w-6 h-6 transition-all duration-500 group-hover:scale-105"
                    style={{ color: linkedIn?.color }}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold pt-[0.2rem] text-gray-200 tracking-tight leading-none group-hover:text-white transition-colors duration-300">
                {linkedIn?.name}
              </span>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {linkedIn?.subText}
              </span>
            </div>

            <ExternalLink className="relative size-5 text-gray-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1" />
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                  translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
            />
          </div>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[github, facebook].map((link) => (
            <a
              href={link.url}
              key={link.name}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`}
              ></div>

              <div className="relative flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-30"
                  style={{
                    backgroundColor: link.color,
                  }}
                ></div>
                <link.icon
                  className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                  style={{
                    color: link.color,
                  }}
                />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                  {link.subText}
                </span>
              </div>
              <ExternalLink
                className="w-4 h-4 text-gray-500 group-hover:text-white ml-auto
                                     opacity-0 group-hover:opacity-100 transition-all duration-300
                                     transform group-hover:translate-x-0 -translate-x-2"
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
