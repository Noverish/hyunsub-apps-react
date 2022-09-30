import ApparelDesktopHeader from './ApparelDesktopHeader';
import ApparelMobileHeader from './ApparelMobileHeader';

// TODO 모든 서비스의 header를 합치고, scss 도 정리하기
export default function ApparelHeader() {
  if (window.innerWidth < 738) {
    return <ApparelMobileHeader />
  } else {
    return <ApparelDesktopHeader />
  }
}
