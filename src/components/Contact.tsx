/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Aos from "aos";
import { FormControl } from "@mui/material";
import { Mail, MessageSquare, Send, Share2, User } from "lucide-react";

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
