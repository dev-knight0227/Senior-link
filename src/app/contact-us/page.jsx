import React from 'react';
import { Metadata } from 'next';
import { Mail, Phone, Clock, MapPin, MessageSquare, Users, HelpCircle } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: "SeniorLink | Contact Us",
  description: "Get in touch with our senior care specialists. We're here to help you and your loved ones.",
};

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#0077C8] text-white">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/asdaught.jpeg?height=600&width=1920" 
            alt="Senior care background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">We're Here For You</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Our caring team is ready to answer your questions and provide the support you or your loved ones need.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#0077C8] rounded-full p-3 mr-4">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Phone</h3>
                    <p className="text-lg text-[#0077C8] dark:text-[#3b9ede] font-medium mt-1">(555) 123-4567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mon-Fri, 8am-6pm</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0077C8] rounded-full p-3 mr-4">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Email</h3>
                    <p className="text-lg text-[#0077C8] dark:text-[#3b9ede] font-medium mt-1">care@seniorlink.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0077C8] rounded-full p-3 mr-4">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      123 Care Avenue<br />
                      Wellness City, WC 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0077C8] rounded-full p-3 mr-4">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Hours</h3>
                    <div className="mt-1 space-y-1 text-gray-600 dark:text-gray-300">
                      <p>Monday - Friday: 8am - 6pm</p>
                      <p>Saturday: 9am - 2pm</p>
                      <p>Sunday: Closed</p>
                      <p className="text-sm text-[#0077C8] dark:text-[#3b9ede] font-medium mt-2">
                        24/7 Emergency Support Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Preview */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                <Image 
                  src="/images/map.PNG?height=300&width=500&text=Location+Map" 
                  alt="Office location map" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Visit Our Center</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  Easily accessible with parking and wheelchair access
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-[#0077C8] dark:text-[#3b9ede] font-medium text-sm hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Send Us a Message</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                  />
                </div>
                
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type of Inquiry*
                  </label>
                  <select
                    id="inquiryType"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                    required
                  >
                    <option value="">Please select</option>
                    <option value="care">Care Services</option>
                    <option value="housing">Housing Options</option>
                    <option value="pricing">Pricing & Insurance</option>
                    <option value="tour">Schedule a Tour</option>
                    <option value="employment">Employment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all text-base"
                    required
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <input
                    id="consent"
                    type="checkbox"
                    className="h-5 w-5 mt-1 text-[#0077C8] dark:text-[#3b9ede] focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] border-gray-300 dark:border-gray-600 rounded"
                    required
                  />
                  <label htmlFor="consent" className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                    I consent to having this website store my submitted information so they can respond to my inquiry. View our <a href="/privacy" className="text-[#0077C8] dark:text-[#3b9ede] hover:underline">privacy policy</a> to learn more about how we use data.
                  </label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-4 bg-[#0077C8] hover:bg-[#0066b0] dark:bg-[#0077C8] dark:hover:bg-[#0088e0] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] focus:ring-offset-2 dark:focus:ring-offset-gray-900 text-lg"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        {/* <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
              Find answers to common questions about our senior care services and how we can help you or your loved ones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start">
                <div className="bg-[#0077C8] rounded-full p-2 mr-4 shrink-0">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white text-lg">What services do you offer?</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    We provide a comprehensive range of senior care services including assisted living, memory care, rehabilitation, dietary services, and social activities tailored to each resident's needs.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start">
                <div className="bg-[#0077C8] rounded-full p-2 mr-4 shrink-0">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white text-lg">How much do your services cost?</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Our pricing varies based on the level of care needed. We work with most insurance providers and offer various payment options. Contact us for a personalized assessment and quote.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start">
                <div className="bg-[#0077C8] rounded-full p-2 mr-4 shrink-0">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white text-lg">Can I schedule a tour of your facility?</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    We encourage families to visit our facilities. You can schedule a tour by calling us or filling out the contact form on this page. Virtual tours are also available.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start">
                <div className="bg-[#0077C8] rounded-full p-2 mr-4 shrink-0">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white text-lg">What qualifications do your staff have?</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Our team consists of licensed nurses, certified caregivers, and specialists with extensive training in senior care. All staff undergo background checks and continuous professional development.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="/faq" className="inline-flex items-center text-[#0077C8] dark:text-[#3b9ede] font-medium hover:underline">
              View all FAQs
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div> */}
        
        {/* Call to Action */}
        <div className="mt-16 bg-[#0077C8] text-white rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
              <p className="text-lg opacity-90 mb-6">
                Our care specialists are available 24/7 to help with urgent needs and questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+15551234567" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#0077C8] font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
                {/* <a 
                  href="#" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white font-medium rounded-lg border border-white hover:bg-white/10 transition-colors"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Live Chat
                </a> */}
              </div>
            </div>
            <div className="hidden md:block relative">
              <Image 
                src="/images/knitting.jpeg?height=400&width=500" 
                alt="Senior care specialist" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Accessibility Features */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">We're Committed to Accessibility</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <Users className="h-8 w-8 text-[#0077C8] dark:text-[#3b9ede]" />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Multilingual Staff</h3>
              </div>
              
              <div className="p-4">
                <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0077C8] dark:text-[#3b9ede]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Wheelchair Access</h3>
              </div>
              
              <div className="p-4">
                <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0077C8] dark:text-[#3b9ede]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Hearing Assistance</h3>
              </div>
              
              <div className="p-4">
                <div className="bg-white dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0077C8] dark:text-[#3b9ede]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white">Virtual Meetings</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}