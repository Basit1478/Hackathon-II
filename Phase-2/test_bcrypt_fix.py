#!/usr/bin/env python3
"""
Test script to verify the bcrypt password hashing fix for Windows
"""
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app.security import hash_password, verify_password

def test_password_hashing():
    print("Testing bcrypt password hashing fix...")

    # Test with a short password (should work as before)
    short_password = "short123"
    short_hash = hash_password(short_password)
    assert verify_password(short_password, short_hash), "Short password verification failed"
    print("✓ Short password test passed")

    # Test with a password exactly at the 72-byte limit
    # Note: 72 ASCII characters = 72 bytes
    exact_limit_password = "a" * 72
    exact_hash = hash_password(exact_limit_password)
    assert verify_password(exact_limit_password, exact_hash), "72-byte password verification failed"
    print("✓ 72-byte password test passed")

    # Test with a password longer than 72 bytes (the main fix)
    long_password = "This is a very long password that exceeds the 72-byte limit that bcrypt has on Windows systems and should be properly handled by our new implementation"
    long_hash = hash_password(long_password)
    assert verify_password(long_password, long_hash), "Long password verification failed"
    print("✓ Long password test passed")

    # Test with Unicode characters that might exceed 72 bytes when encoded
    unicode_password = "✓password✓" * 10  # This will be > 72 bytes when encoded as UTF-8
    unicode_hash = hash_password(unicode_password)
    assert verify_password(unicode_password, unicode_hash), "Unicode password verification failed"
    print("✓ Unicode password test passed")

    # Test with a very long password
    very_long_password = "a" * 1000
    very_long_hash = hash_password(very_long_password)
    assert verify_password(very_long_password, very_long_hash), "Very long password verification failed"
    print("✓ Very long password test passed")

    # Test that wrong passwords don't verify
    wrong_password = "wrong_password"
    assert not verify_password(wrong_password, long_hash), "Wrong password should not verify"
    print("✓ Wrong password correctly rejected")

    print("\nAll tests passed! The bcrypt fix is working correctly.")

if __name__ == "__main__":
    test_password_hashing()