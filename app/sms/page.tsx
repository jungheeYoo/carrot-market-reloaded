//-----------------------------------------------------
// 4-3
// Log in Screen
// 소셜 로그인 버튼 분리
// 계정 생성 화면과 로그인 화면에서 모두 사용

import FormButton from '@/components/button';
import FormInput from '@/components/input';
import SocialLogin from '@/components/social-login';

// Create Account Screen
export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="number"
          placeholder="Phone number"
          required
          errors={[]}
        />
        <FormInput
          type="number"
          placeholder="Verification code"
          required
          errors={[]}
        />
        <FormButton loading={false} text="Verify" />
      </form>
    </div>
  );
}

// 4-0 ~ 4-3 인증 화면 UI (Authentication UI )
// 5-0 ~ 5-4 form 처리 방법 (Server Actions)
