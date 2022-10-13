---
categories:
  - front-end
date: "2022-10-14"
description: stale-while-revalidate 캐시전략에 대한 간단 회고
tags:
  - web
  - cache
title: stale-while-revalidate란 무엇인가
---

이전에 fresh response, stale response에 대해서 알아야 할 필요가 있다.

### Fresh response

응답이 최신인것을 나타낸다. 이것은 보통 요청 지침에 따라 이후의 요청에 해당 응답이 다시 사용될 수 있다는 것을 나타낸다.

### stale response

응답이 오래된 응답임을 나타낸다 이것은 보통 응답이 다시 사용될 수 없다는 것을 의미한다. 캐시 스토리지는 오래된 응답을 즉시 제거할 필요가 없는데, 그 이유는 재검증을 통해 응답이 stale응답에서 fresh응답으로 변경될 수 있기 때문이다.

자 그럼 이제 stale-while-revalidate 캐시 컨트롤에 대해서 알아보자

해당 캐시 컨트롤은 캐시가 캐시에 대한 유효성을 재검증 하는동안 캐시가 stale한 응답을 재사용할 수 있는 것을 나타낸다.

예시 캐시헤더를 하나 작성하자면

`Cache-Control: max-age=604800, stale-while-revalidate=86400`

위의 캐시헤더는 응답은 7일동안 fresh하다고 판단할 수 있다. 7일 뒤에는 stale해지지만, 캐시는 백그라운드에서 응답을 재검증 하는 경우 다음날(86400초) 에 이루어진 모든 요청에 대해 이를 재사용할 수 있다는것을 나타낸다.

재검증은 캐시를 다시 fresh하게 만들것이고, 고로 그것은 라이언트가 항상 그 기간동안 항상 fresh하게 만들 수 있다. 이것은 재검증의 대기시간 패널티를 효과적으로 숨겨줄 수 있다.

만일 그 기간동안 요청이 발생하지 않는다면, 그 캐시는 stale해질 것이고, 다음 요청은 보통의 재검증을 통하게 될 것이다.

![스크린샷](/assets/img/stale-while-revalidate.png)

그림으로 나타내면 위와 같다.
