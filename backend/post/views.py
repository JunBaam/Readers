from django.db.models import Q
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action, permission_classes, authentication_classes
from rest_framework.generics import get_object_or_404
from django.utils import timezone
from datetime import timedelta
from rest_framework import status, response
from rest_framework.response import Response
from .serializers import PostSerializer, CommentSerializer, BookMarkSerializer, AuthorSerializer
from .models import Post, Comment
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
import json
from django.http import JsonResponse
from accounts.models import User

class UserViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = AuthorSerializer


# Todo : 유저 소환으로 사용하자@@
class BookMarkList(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = (
        Post.objects.all()
        .select_related("user")
        .prefetch_related("like_user_set")
    )

    serializer_class = BookMarkSerializer

    # def get_queryset(self):
    #     qs = super().get_queryset()
    #     qs = qs.filter(
    #         # 로그인한 유저의 작성값만 가져옴
    #         Q(user=self.request.user)
    #     )
    #     return qs

# 권한허가


@ permission_classes([AllowAny])
class PostViewSet(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related("user")
        .prefetch_related("like_user_set")
    )

    serializer_class = PostSerializer

    # Q 객체를 사용하면 and, or, not 연산을 이용한 조건을 걸어서 데이터를 불러올수있다
    # @@@@ 여기서 현재로그인유저값을 받아오고 user 필드에 값을넣어줌
    def perform_create(self, serializer):
        # 작성자(현재 로그인한유저값을 받아옴)
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)

    # detail : pk 값 받냐안받냐의 차이
    @ action(detail=True, methods=["POST"])
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    # 같은주소로 delete 가적용된다.
    @ like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)

    # 작성리뷰목록( 로그인한 유저 )
    @ action(detail=False, methods=['GET'])
    def userreview(self, request):
        qs = Post.objects.filter(
            Q(user=self.request.user)     # 로그인유저의 작성값만 불러옴
        ).values()
        return Response(qs)

    # 북마크 많은순
    @action(detail=False, methods=['GET'])
    def bestreveiw(self, request):
        qs = Post.objects.values().order_by('like_user_set').count()

        return Response(qs)

    # 차트정보 ()

    @ action(detail=False, methods=['GET'])
    def chart(self, request):
        # 로그인한 유저의 category목록
        qs = Post.objects.filter(
            Q(user=self.request.user)
        ).values('category')

        qs_type = list(qs)
        # .values:  key, value 형태로 뱉어줌
        # .values_list : tuple 형태로 뱉어줌
        # .values_list('category', flat=True) : 리스트로 뱉어줌

        # 중복값제거
        # my_list = set(qs)
        # print(my_list)
        # key = {'category'}
        # dic = dict(zip(key, qs))

        # 파이썬에서 값을 수정하위해 형변환이 필수

        # qs_type = list(qs)

        print(qs_type)

        # count = {}
        # for i in qs_type:
        #     try:
        #         count[i] += 1
        #     except:
        #         count[i] = 1
        # print("중복카운트", count)
        # print(type(count))

        # word_cnt = {}
        # for word in qs_type:
        #     if word not in word_cnt.keys():
        #         word_cnt[word] = 1
        #     else:
        #         word_cnt[word] += 1

        # print("중복1", word_cnt)

        # key 값만출력
        # vv = count.values()

        # res = [dict(zip(['category'], [x])) for x in count]
        # print(res)
        # ress = [dict(zip(['count'], [x])) for x in vv]

        # return JsonResponse(
        #     {"data":  [ress, res]}
        # )

        return Response(qs)


# 댓글 정의
class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # url 에 접근할수있다 (post_pk)
        url_pk = self.kwargs['post_pk']
        qs = super().get_queryset()
        qs = qs.filter(post__pk=url_pk)
        return qs

    """  User와 Post는 클라이언트에서 작성하지말고 장고에서 작성해준다. """

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_pk'])
        serializer.save(user=self.request.user, post=post)
        return super().perform_create(serializer)
