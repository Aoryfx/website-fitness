import Link from 'next/link';
import { ArrowRightIcon, HeartIcon, FireIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <HeartIcon className="h-8 w-8 text-red-500" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">FitTracker Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/tasks" className="text-gray-700 hover:text-blue-600 transition-colors">
                Tasks
              </Link>
              <Link href="/workouts" className="text-gray-700 hover:text-blue-600 transition-colors">
                Workouts
              </Link>
              <Link href="/nutrition" className="text-gray-700 hover:text-blue-600 transition-colors">
                Nutrition
              </Link>
              <Link href="/safety" className="text-gray-700 hover:text-blue-600 transition-colors">
                Safety
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Complete
              <span className="text-blue-600"> Fitness Journey</span>
              <br />
              Starts Here
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Track your workouts, monitor your nutrition, manage your fitness tasks, and stay safe with our comprehensive fitness platform designed for all fitness levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tasks"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/workouts"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                View Workouts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Fitness Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines task management, workout planning, nutrition tracking, and safety guidance in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Task Management */}
            <div className="text-center p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg mb-4">
                <ClockIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Task Management</h3>
              <p className="text-gray-600 mb-4">
                Organize your fitness goals with smart task tracking and priority management.
              </p>
              <Link href="/tasks" className="text-blue-600 font-medium hover:text-blue-700">
                Manage Tasks →
              </Link>
            </div>

            {/* Workout Plans */}
            <div className="text-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-lg mb-4">
                <FireIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Workout Plans</h3>
              <p className="text-gray-600 mb-4">
                Access professionally designed workouts for all fitness levels and equipment.
              </p>
              <Link href="/workouts" className="text-green-600 font-medium hover:text-green-700">
                View Workouts →
              </Link>
            </div>

            {/* Nutrition Tracking */}
            <div className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 text-white rounded-lg mb-4">
                <HeartIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nutrition Tracking</h3>
              <p className="text-gray-600 mb-4">
                Monitor your calories, macros, and nutrition goals with detailed tracking.
              </p>
              <Link href="/nutrition" className="text-orange-600 font-medium hover:text-orange-700">
                Track Nutrition →
              </Link>
            </div>

            {/* Safety & Equipment */}
            <div className="text-center p-6 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-lg mb-4">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety First</h3>
              <p className="text-gray-600 mb-4">
                Learn proper form, equipment safety, and injury prevention techniques.
              </p>
              <Link href="/safety" className="text-purple-600 font-medium hover:text-purple-700">
                Safety Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Track Your Progress</h2>
            <p className="text-xl text-gray-600">See how far you've come with detailed analytics and insights.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">250+</div>
              <div className="text-lg text-gray-600">Workout Plans</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-lg text-gray-600">Food Database</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-lg text-gray-600">Safe Exercises</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already achieved their fitness goals with FitTracker Pro.
          </p>
          <Link
            href="/tasks"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Start Your Journey
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <HeartIcon className="h-6 w-6 text-red-500" />
                <span className="ml-2 text-lg font-bold">FitTracker Pro</span>
              </div>
              <p className="text-gray-400">
                Your complete fitness companion for a healthier, stronger you.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tasks" className="hover:text-white transition-colors">Task Management</Link></li>
                <li><Link href="/workouts" className="hover:text-white transition-colors">Workout Plans</Link></li>
                <li><Link href="/nutrition" className="hover:text-white transition-colors">Nutrition Tracking</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">Safety Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FitTracker Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
