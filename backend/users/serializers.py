from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'password'
        )
        
    # in case of serializer.save() password is visible. We need hashing.  set_password() hashes password
    # We override this method. Before Serializer did all things by itself, now we change one method
    
    # validated_data is dictionary after checking validation
    # before create() doesn't hash anything. Now we hash password
    def create(self, validated_data):
        user = User.objects.create_user( # create_user() hashes password using set_password.
            username=validated_data['username'], 
            email=validated_data['email'],
            password=validated_data['password'] # we hash password overriding create and using create_user
        )
        return user
    # Eventually we just overrided. But arcitecture works as usual calling create (overrided one)
    
    
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
        )