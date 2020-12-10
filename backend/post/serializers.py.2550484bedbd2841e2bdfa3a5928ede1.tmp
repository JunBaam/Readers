from rest_framework import serializers
from .models import Post, Comment
from accounts.models import User


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "avatar"
        ]


class CommentSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    user = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'message',
            'created_at',
        ]


class PostSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    user = AuthorSerializer(read_only=True)
    is_like = serializers.SerializerMethodField("is_like_field")
    comments = CommentSerializer(
        many=True, read_only=True)
    """
    1. 로그인한 유저값을 view에서 context로 받아옴
    2. 로그인한 유저가 like_user_set [] 안에 존재하면 ,  exists()를통해 true를 출력
    """

    def is_like_field(self, post):
        # 현재 로그인 유저를 view 단에서 context 로 받아온다.
        if 'request' in self.context:
            user = self.context['request'].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return True

    class Meta:
        model = Post
        fields = [
            'id',
            'user',
            'author',
            'publisher',
            'title',
            'content',
            'price',
            'date',
            'category',
            'review',
            'rating',
            'image_url',
            # 'image_file',
            'created_at',
            "comments",
            'is_like',
            'like_user_set',
        ]


class BookMarkSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    user = AuthorSerializer(read_only=True)
    # 뒤에 field를 붙여줘야함
    is_like_count = serializers.SerializerMethodField("is_like_count_field")

    # 북마크 갯수 계산
    def is_like_count_field(self, post):
        like_count = post.like_user_set.count()

        return like_count

    class Meta:

        model = Post
        fields = [
            'id',
            'user',
            'image_url',
            'title',
            'author',
            'like_user_set',
            'is_like_count',
            'created_at',
            'date',
            'category',
        ]
