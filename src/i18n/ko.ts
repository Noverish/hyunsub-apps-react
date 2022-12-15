const ko = {
  translation: {
    'modify': '변경',
    'edit': '수정',
    'delete': '삭제',
    'view': '보기',
    'add': '추가하기',
    'logout': '로그아웃',
    'menus': '메뉴',
    'search': '검색',
    'close': '닫기',
    'setting': '설정',

    'msg.delete-confirm': '정말로 삭제하시겠습니까?',
    'msg.delete-success': '삭제되었습니다',
    'msg.type-query': '검색어를 입력하세요...',

    'common.404.oh': '앗!',
    'common.404.not-exist': '해당 페이지가 존재하지 않습니다',
    'common.404.go-to-home': '홈으로',
    'common.500.oh': '이런!',
    'common.500.error': '예상하지 못한 에러가 발생했습니다',
    'common.500.go-to-home': '홈으로',

    'auth.login': '로그인',
    'auth.logout': '로그아웃',
    'auth.login-persist': '로그인 유지',
    'auth.register': '회원가입',
    'auth.sign-out': '회원탈퇴',
    'auth.sign-out.confirm': '정말로 회원탈퇴 하시겠습니까?',
    'auth.sign-out.success': '회원탈퇴에 성공했습니다',
    'auth.id': '아이디',
    'auth.pw': '비밀번호',
    'auth.pw-confirm': '비밀번호 재입력',
    'auth.errMsg.empty-id': '아이디를 입력해주세요',
    'auth.errMsg.empty-pw': '비밀번호를 입력해주세요',
    'auth.errMsg.short-id': '아이디는 4글자 이상이어야 합니다',
    'auth.errMsg.long-id': '아이디는 20글자 이하이어야 합니다',
    'auth.errMsg.wrong-pattern-id': '아이디는 알파벳 또는 숫자로만 이루어져 있어야 합니다',
    'auth.errMsg.short-pw': '비밀번호는 8글자 이상이어야 합니다',
    'auth.errMsg.long-pw': '비밀번호는 100글자 이하이어야 합니다',
    'auth.errMsg.not-equal-pw': '비밀번호가 서로 다릅니다',
    'auth.errMsg.invalid-id-pw': '아이디 또는 비밀번호가 올바르지 않습니다',
    'auth.errMsg.already-exist-id': '이미 존재하는 아이디입니다',
    'auth.errMsg.captcha-required': '캡차의 체크박스를 클릭해주세요.',
    'auth.msg.register-success': '회원가입에 성공했습니다. 방금 가입한 정보로 로그인해주세요',
    'auth.api.valid-url.failure': '잘못된 접근입니다',

    'auth.my-page.title': '내 계정 관리',
    'auth.my-page.login-info': '로그인 정보',
    'auth.my-page.login-status': '로그인 현황',
    'auth.my-page.login-history': '로그인 기록',
    'auth.my-page.login-history-num': '{{0}}건',
    'auth.my-page.login-device': '로그인된 기기 목록',
    'auth.my-page.login-device-num': '{{0}}개의 기기',
    'auth.modify-username-modal.title': '아이디 변경하기',
    'auth.modify-username-modal.success': '아이디 변경에 성공했습니다. 다시 로그인 해주세요',
    'auth.modify-username-modal.failure': '아이디 변경에 실패했습니다',
    'auth.modify-password-modal.title': '비밀번호 변경하기',
    'auth.modify-password-modal.success': '비밀번호 변경에 성공했습니다. 다시 로그인 해주세요',
    'auth.modify-password-modal.failure': '비밀번호 변경에 실패했습니다',

    'video.page.search.title': `'{{0}}'에 대한 {{1}}건의 검색 결과`,
    'video.term.sort.random': '랜덤순',
    'video.term.sort.new': '최신 업로드순',
    'video.term.sort.old': '오래된 업로드순',
    'video.term.sort.abc': '가나다순',
    'video.term.sort.zyx': '가나다역순',
    'video.episode-section.title': '전체 {{0}}화',
    'video.group-section.title': '다른 {{0}} 목록',
    'video.search-modal.title': '비디오 검색하기',
    'video.search-modal.label': '검색어',
    'video.setting-section.title': '비디오 재생 설정',
    'video.setting-section.subtitle-font-size': '자막 글자 크기: {{0}}px',
    'video.subtitle-setting.title': '자막 싱크 설정',

    'photo.page.album-list.title': '내 앨범 목록',
    'photo.page.album-detail.title': '사진 목록 - {{0}}',
    'photo.page.album-detail.upload': '사진 업로드',
    'photo.page.album-detail.photo-num': '{{0}}개의 사진',
    'photo.page.album-viewer.title': '사진 뷰어 - {{0}}',
    'photo.page.album-upload.title': '사진 업로드 - {{0}}',
    'photo.page.album-upload.back-to-album': '앨범으로 돌아가기',
    'photo.page.album-upload.upload': '업로드',
    'photo.page.album-upload.msg.empty-upload': '업로드할 파일을 선택해주세요',
    'photo.page.photo-list.title': '내 사진 목록',
    'photo.page.photo-original.title': '원본 보기 - {{0}}',
    'photo.page.setting.title': '설정',
    'photo.term.photo-dimension': '사진 크기',
    'photo.term.photo-date': '촬영 날짜',
    'photo.term.photo-size': '사진 용량',

    'apparel.page.list.title': '내 의류 목록',
    'apparel.page.list.inner-title': '총 {{0}}개의 의류',
    'apparel.page.detail.title': '자세한 의류 정보',
    'apparel.page.edit.title': '수정 - {{0}}',
    'apparel.page.add.title': '의류 추가하기',
    'apparel.page.category-list.title': '의류 카테고리 목록',
    'apparel.page.category-detail.title': '의류 카테고리 - {{0}}',
    'apparel.page.category-detail.inner-title': '의류 카테고리 - {{0}} ({{1}}개)',
    'apparel.page.brand-list.title': '의류 브랜드 목록',
    'apparel.page.brand-detail.title': '의류 브랜드 - {{0}}',
    'apparel.page.brand-detail.inner-title': '의류 브랜드 - {{0}} ({{1}}개)',
    'apparel.menu.all-apparels': '모든 의류',
    'apparel.menu.categories': '종류',
    'apparel.menu.brands': '브랜드',
    'apparel.term.name': '이름',
    'apparel.term.itemNo': '상품번호',
    'apparel.term.brand': '브랜드',
    'apparel.term.category': '분류',
    'apparel.term.size': '사이즈',
    'apparel.term.color': '색상',
    'apparel.term.originPrice': '원가',
    'apparel.term.discountPrice': '할인가',
    'apparel.term.buyDt': '구매일',
    'apparel.term.buyLoc': '구매장소',
    'apparel.term.material': '소재',
    'apparel.term.size2': '사이즈 상세',
    'apparel.term.makeDt': '제조년월',

    'drive.status-modal.title': '업로드 현황',

    'PageSelectModal.title': '페이지 이동',
    'PageSelectModal.close': '취소',
    'PageSelectModal.move': '이동',
    'PageSelectModal.msg.invalid-page': '올바른 값을 입력해주세요',
  }
};

export default ko;
