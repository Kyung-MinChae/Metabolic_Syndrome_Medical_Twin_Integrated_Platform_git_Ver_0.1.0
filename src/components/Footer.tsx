import { MadeWithDyad } from "./made-with-dyad";

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 flex justify-between items-center">
        <div className="space-x-4">
          <a href="#" className="hover:text-blue-600">이용약관</a>
          <span className="border-l"></span>
          <a href="#" className="hover:text-blue-600">개인정보처리방침</a>
          <span className="border-l"></span>
          <a href="#" className="hover:text-blue-600">문의</a>
        </div>
        <MadeWithDyad />
      </div>
    </footer>
  );
}