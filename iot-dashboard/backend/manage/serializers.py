from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Profile, User, Family


class FamilySerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Familia (Family)
    """
    class Meta:
        model = Family
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Perfil (Profile)
    """
    name = serializers.ReadOnlyField(source='user.name')
    email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Profile
        fields = ('name', 'email')



class NewUserSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Usuario (Usuario)
        * Aplica cuando se va a crear un usuario
    """
    user_profile = ProfileSerializer(required=False)
    role = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'password',
                  'user_profile', 'role')
        read_only_fields = ('is_active', 'id')

        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User(email=validated_data['email'],
                    first_name=validated_data['first_name'],
                    last_name=validated_data['last_name'])
        user.set_password(validated_data['password'])
        user.save()
        return user

class UpdateUserSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Usuario (User)
        * Aplica cuando se va a actualizar la información de un Usuario
    """
    user_profile = ProfileSerializer(required=False)
    role = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active',
                  'user_profile', 'role')
        read_only_fields = ('id', 'user', 'is_active')

    def update(self, instance, validated_data):
        user_profile = validated_data.pop('user_profile')
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.user_profile.role = user_profile.get('role', instance.user_profile.role)
        instance.user_profile.family = user_profile.get('family', instance.user_profile.family)
        instance.user_profile.save()
        instance.save()
        return instance


class UpdateUserPasswordSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Usuario (User)
        * Aplica cuando se va a actualizar la contraseña de un Usuario
    """
    class Meta:
        model = User
        fields = ('password', 'email')
        read_only_fields = ('id', 'user', 'email')

        extra_kwargs = {
            'password': {'write_only': True},
        }

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance


class TokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializador del token JWT
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['name'] = user.name
        token['role'] = user.role

        return token
