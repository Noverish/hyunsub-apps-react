const ko = {
  translation: {
    modify: '변경',
    edit: '수정',
    delete: '삭제',
    view: '보기',
    add: '추가',
    logout: '로그아웃',
    menus: '메뉴',
    search: '검색',
    close: '닫기',
    setting: '설정',
    error: '오류',
    select: '선택',
    cancel: '취소',
    create: '생성',
    upload: '업로드',
    sort: '정렬',
    filter: '필터',
    download: '다운로드',
    complete: '완료',
    query: '검색어',
    yesterday: '어제',
    tomorrow: '내일',
    applications: '앱 목록',
    profile: '내 정보',
    letters: '{{0}} 글자',
    'n-selected': '{{0}}개 선택됨',
    'no-selection': '선택 없음',

    'msg.delete-confirm': '정말로 삭제하시겠습니까?',
    'msg.delete-success': '삭제되었습니다',
    'msg.type-query': '검색어를 입력하세요...',

    'common.403.oh': '엥?!',
    'common.403.not-exist': '해당 페이지에 접근할 수 없습니다',
    'common.403.go-to-home': '홈으로',
    'common.404.oh': '앗!',
    'common.404.not-exist': '해당 페이지가 존재하지 않습니다',
    'common.404.go-to-home': '홈으로',
    'common.500.oh': '이런!',
    'common.500.error': '예상하지 못한 에러가 발생했습니다',
    'common.500.go-to-home': '홈으로',
    'CommonNavigation.search': '검색',
    'CommonNavigation.menu': '메뉴',
    'CommonSearchResult.empty-result': '검색 결과가 없습니다',
    'CommonSearchResult.result-num': '{{total}}개',
    'CommonSearchResult.search-status': '{{query}}에 대한 {{total}}개의 검색 결과',
    'common.form.feedback.required': '값을 입력해주세요',
    'common.form.feedback.no-minus': '음수를 입력하실 수 없습니다',
    'common.select.please-select': '값을 선택해주세요',

    'upload.status': '{{now}} / {{total}}개 완료',
    'upload.ready': '준비',
    'upload.upload': '업로드',
    'upload.abort': '중단',
    'upload.aborted': '중단됨',
    'upload.completed': '완료',
    'upload.clear': '초기화',

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
    'auth.modify-password-modal.title': '비밀번호 변경하기',
    'auth.ProfilePage.language': '언어 설정',

    'video.term.sort.random': '랜덤순',
    'video.term.sort.new': '최신 업로드순',
    'video.term.sort.old': '오래된 업로드순',
    'video.term.sort.abc': '가나다순',
    'video.term.sort.zyx': '가나다역순',
    'video.episode-section.title': '전체 {{0}}화',
    'video.group-section.title': '다른 {{0}} 목록',
    'video.setting-section.title': '비디오 재생 설정',
    'video.VideoSettingSubtitleSizeCard.title': '자막 크기 설정',
    'video.VideoSettingSubtitleSizeCard.label': '현재 자막 글자 크기: {{0}}px',
    'video.VideoSettingSubtitleSyncCard.title': '자막 싱크 설정',
    'VideoTabBar.home': '홈',
    'VideoTabBar.history': '시청 기록',
    'VideoHomePage.title': '홈 페이지',
    'VideoHomePage.more': '더보기 >',
    'VideoSearchPage.title': '비디오 검색',
    'VideoSearchPage.result-title': `'{{0}}'에 대한 {{1}}건의 검색 결과`,

    'photo.page.album-list.title': '내 앨범 목록',
    'photo.page.album-detail.title': '사진 목록 - {{0}}',
    'photo.page.album-detail.upload': '사진 업로드',
    'photo.page.album-detail.photo-num': '{{0}}개의 사진',
    'AlbumViewerPage.title': '앨범 뷰어',
    'photo.page.album-upload.title': '{{0}} - 사진 업로드',
    'photo.page.album-upload.back-to-album': '앨범으로 돌아가기',
    'photo.page.album-upload.upload': '업로드',
    'photo.page.album-upload.msg.empty-upload': '업로드할 파일을 선택해주세요',
    'PhotoListPage.title': '내 사진 목록',
    'photo.page.setting.title': '설정',
    'photo.term.photo-dimension': '사진 크기',
    'photo.term.photo-date': '촬영 날짜',
    'photo.term.photo-size': '사진 용량',
    'PhotoNavigation.album': '앨범',
    'PhotoNavigation.photo': '사진',
    'PhotoNavigation.upload': '업로드',
    'PhotoNavigation.share': '공유',
    'PhotoUploadPage.title': '사진 업로드',
    'PhotoUploadPage.photo-num': '{{0}}개의 사진',
    'PhotoListView.select-all': '전체 선택',
    'PhotoListView.unselect-all': '전체 선택 해제',
    'PhotoListView.add-to-album': '앨범에 추가',
    'PhotoListView.delete-from-album': '앨범에서 사진 제거',
    'PhotoListView.delete-photo': '사진 완전 제거',
    'photo.album-select': '앨범 선택',
    'AlbumCreateModal.title': '앨범 생성',
    'AlbumCreateModal.name': '앨범 이름',
    'photo.register-thumbnail': '썸네일 등록',
    'photo.album-delete-confirm': '정말로 앨범을 삭제하시겠습니까?',
    'PhotoInfoSection.image-size': '해상도',
    'PhotoInfoSection.file-size': '파일 크기',
    'PhotoInfoSection.date': '촬영 날짜',
    'PhotoInfoSection.file-name': '파일 이름',
    'PhotoInfoSection.reg-dt': '업로드 날짜',
    'PhotoInfoSection.date-type': '촬영 날짜 타입',
    'AlbumDetailPage.delete-album': '앨범 삭제',
    'PhotoInfoSection.go-to-original': '원본 보기',
    'PhotoInfoSection.go-to-detail': '상세 보기',
    'PhotoDetailPage.title': '사진 상세',
    'PhotoDateModal.title': '사진 촬영 날짜 수정',

    'apparel.page.list.title': '내 의류 목록',
    'apparel.page.list.inner-title': '총 {{0}}개의 의류',
    'apparel.page.detail.title': '자세한 의류 정보',
    'apparel.page.edit.title': '수정 - {{0}}',
    'ApparelCreatePage.title': '의류 추가하기',
    'apparel.page.category-list.title': '의류 카테고리 목록',
    'apparel.page.category-detail.title': '의류 카테고리 - {{0}} ({{1}}개)',
    'apparel.page.brand-list.title': '의류 브랜드 목록',
    'apparel.page.brand-detail.title': '의류 브랜드 - {{0}} ({{1}}개)',
    'ApparelNavigation.all-apparels': '모든 의류',
    'ApparelNavigation.categories': '종류',
    'ApparelNavigation.brands': '브랜드',
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
    'apparel.term.discarded': '버렸음',

    'DriveExplorerPage.title': '파일 탐색기',
    'drive.msg.remove-confirm': '정말로 삭제하시겠습니까?',
    DriveNavigation: '파일 탐색기',
    'drive.preview.files-selected': '{{0}}개 선택',
    'drive.rename.replace': '문자열 바꾸기',
    'drive.rename.replace.button': '바꾸기',
    'drive.rename.add-number': '번호 붙이기',
    'drive.rename.pad-number': '자리수 맞추기',
    'drive.rename.number.start-number': '시작 숫자',
    'drive.rename.number.digit': '자리수',
    'drive.rename.add-number.front': '앞에 붙이기',
    'drive.rename.add-number.back': '뒤에 붙이기',
    'drive.rename.pad-number.button': '맞추기',
    'drive.rename.reset': '초기화',
    'drive.rename.apply': '실제로 적용하기',
    'drive.DriveUploadButton.upload': '업로드',
    'drive.DriveUploadButton.upload-files': '파일 업로드',
    'drive.DriveUploadButton.upload-folder': '폴더 업로드',
    'drive.DriveNewFolderModal.title': '새 폴더 생성',
    'drive.DriveNewFolderModal.label': '새 폴더 이름',
    'drive.DriveNewFolderModal.button': '생성',
    'drive.DriveRenameModal.title': '파일 이름 일괄 수정',
    'drive.DriveRenameModal.label': '파일 이름',
    'drive.DriveRenameModal.button': '수정',
    'drive.DriveExplorerBreadcrumb.home': '홈',
    'drive.DriveExplorerFileList.type': '타입',
    'drive.DriveExplorerFileList.name': '이름',
    'drive.DriveExplorerFileList.size': '크기',
    'drive.DriveExplorerFileList.date': '수정한 날짜',
    'drive.DriveExplorerFileList.new-folder': '새 폴더',
    'drive.DriveExplorerFileList.empty-folder': '폴더가 비었습니다.',
    'drive.DriveExplorerFileList.n-files': '{{0}}개의 파일',
    'drive.DriveUploadModal.abort-msg': '정말로 업로드를 취소하시겠습니까?',
    'drive.YoutubeDownloadModal.title': 'YouTube 다운로드',
    'drive.YoutubeDownloadModal.msg.empty-url': 'URL을 입력해주세요.',
    'drive.YoutubeMetadataForm.resolution': '해상도',
    'drive.YoutubeMetadataForm.subtitles': '자막 목록',

    'comic.ComicListPage.title': '만화 목록',
    'comic.ComicDetailPage.subtitle': '{{0}}개의 에피소드',
    'ComicNavigation.list': '만화',
    'ComicNavigation.history': '감상기록',

    'DiaryNavigation.list': '목록',
    'DiaryNavigation.calendar': '달력',
    'DiaryListPage.title': '일기 목록',
    'DiaryCalendarPage.title': '달력 보기',
    'DiaryCalendarPage.create': '해당 날짜에 일기 쓰기',
    'DiaryDetailPage.title': '일기 상세',
    'DiaryDetailPage.empty-msg': '해당 날짜에 작성된 일기가 없습니다.',
    'DiaryDetailPage.friends': '만난 친구 목록',
    'DiaryDetailPage.photos.title': '사진 {{num}}개',
    'DiaryPhotoPage.title': '사진 목록 - {{date}}',
    'DiaryPhotoPage.subtitle': '총 {{total}}개의 사진',
    'DiaryCreatePage.title': '일기 작성',
    'DiaryUpdatePage.title': '일기 수정',
    'DiarySearchPage.title': '일기 검색',
    'DiaryForm.date': '날짜',
    'DiaryForm.summary': '요약',
    'DiaryForm.content': '내용',
    'DiaryForm.friends': '친구',

    'FriendNavigation.list': '목록',
    'FriendNavigation.tags': '태그',
    'FriendListPage.title': '친구 목록',
    'FriendDetailPage.title': '친구 상세',
    'FriendDetailPage.delete-confirm': '정말로 {{0}}를 삭제하시겠습니까?',
    'FriendCreatePage.title': '친구 등록',
    'FriendUpdatePage.title': '친구 정보 수정',
    'FriendSearchPage.title': '친구 검색',
    'FriendForm.name': '이름',
    'FriendForm.birthday': '생일',
    'FriendForm.tags': '태그',
    'FriendForm.description': '메모',
    'FriendForm.meets': '만남',
    'FriendTagListPage.title': '태그 목록',
    'FriendTagDetailPage.title': '태그 상세 - {{0}}',

    'Dutch.should': '내야하는 돈',
    'Dutch.actual': '실제로 낸돈',
    'Dutch.amount': '금액',
    'Dutch.tripCurrency': '여행 통화',
    'Dutch.settleCurrency': '정산 통화',
    'Dutch.members': '멤버',
    'Dutch.currency-rate': '환율',
    'Dutch.settle-currency-rate': '정산 환율',
    'Dutch.settle': '정산',
    'Dutch.cash-status': '현금 현황',
    'Dutch.initial-balance': '준비 금액',
    'Dutch.spended-balance': '사용 금액',
    'Dutch.remaining-balance': '남은 금액',
    'DutchPayment.card': '카드',
    'DutchPayment.cash': '현금',
    'DutchHomePage.status': '현황',
    'DutchNavigation.home': '홈',
    'DutchNavigation.records': '내역',
    'DutchNavigation.balance': '마이',
    'DutchNavigation.settle': '정산',
    'DutchRecordListPage.title': '내역',
    'DutchRecordDetailPage.title': '내역 상세',
    'DutchRecordCreatePage.title': '내역 추가',
    'DutchRecordUpdatePage.title': '내역 수정',
    'DutchRecord.content': '내역',
    'DutchRecord.location': '장소',
    'DutchRecord.currency': '통화',
    'DutchRecord.payment': '지불방법',
    'DutchRecord.amount': '총액',
    'DutchRecord.date': '시간',
    'DutchRecord.members': '각자 몫',
    'DutchRecordMember.name': '이름',
    'DutchRecordMember.actual': '실제로 낸돈',
    'DutchRecordMember.should': '내야하는 돈',
    'DutchSettlePage.leader': '총무',
    'DutchSettleResultView.message.send': '{{name}}(이)가 {{amount}} 내야함',
    'DutchSettleResultView.message.receive': '{{name}}(이)가 {{amount}} 받아야함',
    'DutchMemberSelectPage.message.choose': '자신을 선택해주세요',
    'DutchSpendPage.select-member': '다른 유저 선택',
    'DutchRecordForm.feedback.invalid-sum': '내야하는 돈의 합과 실제로 낸돈의 합이 같지 않습니다',

    'PageSelectModal.title': '페이지 이동',
    'PageSelectModal.close': '취소',
    'PageSelectModal.move': '이동',
    'PageSelectModal.msg.invalid-page': '올바른 값을 입력해주세요',

    'menu.profile': '프로필 보기',
  },
};

export default ko;
